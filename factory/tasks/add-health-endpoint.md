
# Task: Add a health endpoint

## Objective
Add GET /health to the NestJS application.

## Acceptance criteria
1. The endpoint returns HTTP 200 when the application is running.
2. The response is JSON.
3. The response contains:
   - status: "ok"
4. Add an automated test for the endpoint.
5. Existing tests must continue to pass.

## Constraints
- Follow existing NestJS conventions.
- Do not add a new database dependency.
- Do not expose credentials or environment variables.
- Do not modify unrelated business logic.

## Validation
- Run the relevant tests.
- Run the lint command if available.
- Run the production build.
- Report changed files and validation results.
