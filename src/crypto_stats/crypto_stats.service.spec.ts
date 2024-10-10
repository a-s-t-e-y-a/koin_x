import { Test, TestingModule } from '@nestjs/testing';
import { CryptoStatsService } from './crypto_stats.service';

describe('CryptoStatsService', () => {
  let service: CryptoStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoStatsService],
    }).compile();

    service = module.get<CryptoStatsService>(CryptoStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
