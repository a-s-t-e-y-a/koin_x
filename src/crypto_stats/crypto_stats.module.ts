import { Module } from '@nestjs/common';
import { CryptoStatsService } from './crypto_stats.service';
import { CryptoStatsController } from './crypto_stats.controller';

@Module({
  controllers: [CryptoStatsController],
  providers: [CryptoStatsService],
})
export class CryptoStatsModule {}
