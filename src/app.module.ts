import { Module } from '@nestjs/common';
import { CryptoStatsModule } from './crypto_stats/crypto_stats.module';

@Module({
  imports: [CryptoStatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
