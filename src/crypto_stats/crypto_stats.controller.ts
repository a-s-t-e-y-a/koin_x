import { Controller } from '@nestjs/common';
import { CryptoStatsService } from './crypto_stats.service';

@Controller('crypto-stats')
export class CryptoStatsController {
  constructor(private readonly cryptoStatsService: CryptoStatsService) {}
}
