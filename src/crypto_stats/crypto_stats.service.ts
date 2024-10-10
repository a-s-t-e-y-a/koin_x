import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'nestjs-prisma';
import { Cryptocurrency } from './interface/api_reponse';
@Injectable()
export class CryptoStatsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}
  /// cron job for getting data in every 2 hours
  @Cron('0 */2 * * *')
  async handleCron() {
    const cryptoCurrencies = ['bitcoin', 'ethereum', 'matic-network'];

    const promises = cryptoCurrencies.map(async (coin) => {
      try {
        const response = await this.httpService
          .get<Cryptocurrency[]>(`${process.env.BASE_URL}&ids=${coin}`)
          .toPromise();

        const { name, current_price, price_change_24h, market_cap, id } =
          response.data[0];

        await this.prisma.crypto.create({
          data: {
            crypto_name: name,
            current_price,
            price_change_24h,
            market_cap,
            crypto_id: id,
          },
        });
      } catch (error) {
        console.error(`Error fetching data for ${coin}:`, error); // should use logger instead of console
      }
    });

    await Promise.all(promises);
  }
}
