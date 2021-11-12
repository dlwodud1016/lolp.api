import { Test, TestingModule } from '@nestjs/testing';
import { RenewalController } from './renewal.controller';

describe('RenewalController', () => {
  let controller: RenewalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RenewalController],
    }).compile();

    controller = module.get<RenewalController>(RenewalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
