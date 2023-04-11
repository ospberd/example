import { Test, TestingModule } from '@nestjs/testing';
import { PhonemodelsService } from './phonemodels.service';

describe('PhonemodelsService', () => {
  let service: PhonemodelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhonemodelsService],
    }).compile();

    service = module.get<PhonemodelsService>(PhonemodelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
