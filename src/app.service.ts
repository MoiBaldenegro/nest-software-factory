import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

interface PackageJson {
  version: string;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHealth() {
    return { status: 'ok' };
  }

  getVersion(): { version: string } {
    try {
      const packageJsonPath = join(process.cwd(), 'package.json');
      const packageJsonContent = readFileSync(packageJsonPath, 'utf-8');
      const packageJson = JSON.parse(packageJsonContent) as PackageJson;
      return { version: packageJson.version };
    } catch {
      return { version: '0.0.0' };
    }
  }

  getPing() {
    return { message: 'pong' };
  }

  getReady() {
    return { status: 'ready' };
  }
}
