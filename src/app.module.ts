import { Module } from '@nestjs/common';
import { CryptoStatsModule } from './crypto_stats/crypto_stats.module';
import { PrismaModule } from 'nestjs-prisma';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        explicitConnect: true,
      },
    }),
    ScheduleModule.forRoot(),
    CryptoStatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
