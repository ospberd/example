import { Test, TestingModule } from '@nestjs/testing';
import { PhonemodelsController } from './phonemodels.controller';
import { PhonemodelsService } from './phonemodels.service';

describe('PhonemodelsController', () => {
  let controller: PhonemodelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhonemodelsController],
      providers: [PhonemodelsService],
    }).compile();

    controller = module.get<PhonemodelsController>(PhonemodelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
