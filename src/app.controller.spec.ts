import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('health', () => {
    it('should return { status: "ok" }', () => {
      expect(appController.getHealth()).toEqual({ status: 'ok' });
    });
  });

  describe('version', () => {
    it('should return version from package.json', () => {
      const result = appController.getVersion();
      expect(result).toHaveProperty('version');
      expect(typeof result.version).toBe('string');
    });
  });

  describe('ping', () => {
    it('should return { message: "pong" }', () => {
      expect(appController.getPing()).toEqual({ message: 'pong' });
    });
  });
});
