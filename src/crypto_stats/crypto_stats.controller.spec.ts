import { Test, TestingModule } from '@nestjs/testing';
import { CryptoStatsController } from './crypto_stats.controller';
import { CryptoStatsService } from './crypto_stats.service';

describe('CryptoStatsController', () => {
  let controller: CryptoStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoStatsController],
      providers: [CryptoStatsService],
    }).compile();

    controller = module.get<CryptoStatsController>(CryptoStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
