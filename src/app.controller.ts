import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('version')
  getVersion() {
    return this.appService.getVersion();
  }

  @Get('ping')
  getPing() {
    return this.appService.getPing();
  }

  @Get('ready')
  getReady() {
    return this.appService.getReady();
  }
}
