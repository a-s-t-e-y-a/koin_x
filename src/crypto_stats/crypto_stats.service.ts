import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'nestjs-prisma';
import { Cryptocurrency } from './interface/api_reponse';
interface CryptoData {
  current_price: number;
}
@Injectable()
export class CryptoStatsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async getCurrentStatsById(crypto_id: string) {
    const response = await this.httpService
      .get<Cryptocurrency[]>(`${process.env.BASE_URL}&ids=${crypto_id}`)
      .toPromise();
    return {
      price: response.data[0].current_price,
      marketCap: response.data[0].market_cap,
      '24hChange': response.data[0].price_change_24h,
    };
  }

  calculateStandardDeviation(data: CryptoData[]): number {
    if (data.length === 0) return 0;
    const prices = data.map((item) => item.current_price);
    const mean = prices.reduce((sum, value) => sum + value, 0) / prices.length;

    const variance =
      prices.reduce((sum, value) => {
        const diff = value - mean;
        return sum + diff * diff;
      }, 0) / prices.length;

    return Math.sqrt(variance);
  }

  async getPriceByCryptoId(crypto_id: string): Promise<CryptoData[]> {
    return this.prisma.crypto.findMany({
      where: { crypto_id: crypto_id },
      orderBy: { updated_at: 'desc' },
      take: 100,
      select: { current_price: true },
    });
  }

  async getStandardDeviationById(cryptoId: string): Promise<number> {
    const prices = await this.getPriceByCryptoId(cryptoId);
    return this.calculateStandardDeviation(prices);
  }

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
            current_price: parseFloat(current_price.toString()),
            price_change_24h: parseFloat(price_change_24h.toString()),
            market_cap: parseFloat(market_cap.toString()),
            crypto_id: id,
          },
        });
      } catch (error) {
        console.error(`Error fetching data for ${coin}:`, error.stack); // should use logger instead of console
      }
    });

    await Promise.all(promises);
  }

  //// only if you want to run cron job manually once for testing { and for
  //swagger also}
  async runCronJob() {
    const cryptoCurrencies = ['bitcoin', 'ethereum', 'matic-network'];
    const createEntries = [];
    const promises = cryptoCurrencies.map(async (coin) => {
      try {
        const response = await this.httpService
          .get<Cryptocurrency[]>(`${process.env.BASE_URL}&ids=${coin}`)
          .toPromise();

        const { name, current_price, price_change_24h, market_cap, id } =
          response.data[0];

        const entries = await this.prisma.crypto.create({
          data: {
            crypto_name: name,
            current_price: parseFloat(current_price.toString()),
            price_change_24h: parseFloat(price_change_24h.toString()),
            market_cap: parseFloat(market_cap.toString()),
            crypto_id: id,
          },
        });
        createEntries.push(entries);
      } catch (error) {
        console.error(`Error fetching data for ${coin}:`, error.stack); // should use logger instead of console
      }
    });

    await Promise.all(promises);
    return createEntries;
  }
}
