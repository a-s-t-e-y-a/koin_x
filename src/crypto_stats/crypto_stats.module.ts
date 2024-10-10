import { Module } from '@nestjs/common';
import { CryptoStatsService } from './crypto_stats.service';
import { CryptoStatsController } from './crypto_stats.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [CryptoStatsController],
  providers: [CryptoStatsService],
})
export class CryptoStatsModule {}
