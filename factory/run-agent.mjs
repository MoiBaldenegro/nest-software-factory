import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { basename, dirname, join, parse, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const factoryDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(factoryDirectory, "..");
const taskArgument = process.argv[2];

const MAX_REPAIR_ATTEMPTS = 2;

function runCommand(command, args, options = {}) {
  const executable =
    process.platform === "win32" && command === "pnpm"
      ? "pnpm.cmd"
      : command;

  return new Promise((resolvePromise, reject) => {
    const child = spawn(executable, args, {
      cwd: projectDirectory,
      stdio: "inherit",
      shell: process.platform === "win32" && executable.endsWith(".cmd"),
      ...options,
    });

    child.once("error", reject);

    child.once("close", (code) => {
      if (code === 0) {
        resolvePromise();
        return;
      }

      reject(
        new Error(
          `${command} ${args.join(" ")} exited with code ${code}`,
        ),
      );
    });
  });
}

function getTaskSlug(taskPath) {
  const taskName = parse(basename(taskPath)).name.toLowerCase();
  const slug = taskName
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (!slug) {
    throw new Error(`Could not derive a branch name from task: ${taskPath}`);
  }

  return slug;
}

async function createTaskWorktree(taskSlug) {
  const branchName = `factory/${taskSlug}`;
  const worktreePath = resolve(
    projectDirectory,
    "..",
    `${basename(projectDirectory)}-factory-${taskSlug}`,
  );

  await runCommand("git", [
    "worktree",
    "add",
    "--quiet",
    "-b",
    branchName,
    worktreePath,
    "HEAD",
  ]);

  return { branchName, worktreePath };
}

async function installDependencies(worktreePath) {
  console.log("\n=== Installing dependencies in worktree ===");
  await runCommand("pnpm", ["install", "--frozen-lockfile"], {
    cwd: worktreePath,
  });
}

async function validateProject(worktreePath) {
  const checks = [
    ["lint", "pnpm", ["run", "lint"]],
    ["tests", "pnpm", ["exec", "jest", "--runInBand"]],
    ["build", "pnpm", ["run", "build"]],
  ];

  const failures = [];

  for (const [name, command, args] of checks) {
    console.log(`\n=== Running ${name} ===`);

    try {
      await runCommand(command, args, { cwd: worktreePath });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);

      failures.push({ name, message });
      console.error(`Validation failed: ${name}`);
    }
  }

  return {
    passed: failures.length === 0,
    failures,
  };
}

function getAgentCommand() {
  if (process.platform !== "win32") {
    return "opencode";
  }

  const appData = process.env.APPDATA;

  if (!appData) {
    throw new Error("APPDATA is not defined.");
  }

  return join(
    appData,
    "npm",
    "node_modules",
    "opencode-ai",
    "bin",
    "opencode.exe",
  );
}

async function runOpenCode(prompt, worktreePath) {
  const command = getAgentCommand();

  await runCommand(command, ["run", prompt], { cwd: worktreePath });
}

async function runAgent() {
  if (!taskArgument) {
    throw new Error(
      "Usage: node factory/run-agent.mjs <task-file>",
    );
  }

  const taskPath = resolve(projectDirectory, taskArgument);
  const task = await readFile(taskPath, "utf8");
  const taskSlug = getTaskSlug(taskPath);
  const { branchName, worktreePath } = await createTaskWorktree(taskSlug);

  console.log(`Created branch: ${branchName}`);
  console.log(`Created worktree: ${worktreePath}`);
  console.log("Changes will remain available for review; no push or merge will be performed.");

  await installDependencies(worktreePath);

  const implementationPrompt = `
Follow AGENTS.md.

Implement this task:
${task}

Requirements:
- Inspect the existing project before editing.
- Make the smallest complete change.
- Add or update automated tests.
- Do not modify unrelated functionality.
- Do not deploy, push, or merge changes.
- Do not claim validation passed unless it actually ran.
`;

  console.log("Starting implementation with OpenCode...");
  await runOpenCode(implementationPrompt, worktreePath);

  for (let attempt = 0; attempt <= MAX_REPAIR_ATTEMPTS; attempt++) {
    console.log(
      `\nValidation cycle ${attempt + 1}/${MAX_REPAIR_ATTEMPTS + 1}`,
    );

    const validation = await validateProject(worktreePath);

    if (validation.passed) {
      console.log("\nAll validations passed.");
      console.log(`Review branch ${branchName} in worktree ${worktreePath}.`);
      return;
    }

    if (attempt === MAX_REPAIR_ATTEMPTS) {
      const summary = validation.failures
        .map(({ name, message }) => `- ${name}: ${message}`)
        .join("\n");

      throw new Error(
        `Validation failed after ${MAX_REPAIR_ATTEMPTS} repair attempts:\n${summary}`,
      );
    }

    const failureDetails = validation.failures
      .map(({ name, message }) => `### ${name}\n${message}`)
      .join("\n\n");

    const repairPrompt = `
The implementation task was:
${task}

Automated validation failed.

Failures:
${failureDetails}

Please:
- Inspect the current code and the validation failures.
- Fix the underlying causes of these failures.
- Add or update tests when appropriate.
- Do not remove tests or weaken assertions to make them pass.
- Do not disable lint rules or validation commands to hide failures.
- Do not revert unrelated changes.
- Do not deploy, push, or merge.
- Stop after addressing these issues and report what you changed.
`;

    console.log(
      `\nValidation failed. Starting repair attempt ${attempt + 1}/${MAX_REPAIR_ATTEMPTS}...`,
    );

    await runOpenCode(repairPrompt, worktreePath);
  }
}

runAgent().catch((error) => {
  console.error("\nFactory execution failed:");
  console.error(error);
  process.exitCode = 1;
});
