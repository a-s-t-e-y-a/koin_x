import { Controller, Get, Query, ParseEnumPipe, Post } from '@nestjs/common';
import { CryptoStatsService } from './crypto_stats.service';
import { ApiOperation, ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CryptoCurrency } from './dto/get_crypto.dto';

@ApiTags('Crypto Statistics')
@Controller()
export class CryptoStatsController {
  constructor(private readonly cryptoStatsService: CryptoStatsService) {}

  @Get('stats')
  @ApiOperation({
    summary: 'Get latest cryptocurrency data',
    description: 'Returns the latest data about the requested cryptocurrency.',
  })
  @ApiQuery({
    name: 'coin',
    enum: CryptoCurrency,
    description: 'The cryptocurrency to fetch data for',
  })
  @ApiResponse({ status: 200, description: 'Latest cryptocurrency data' })
  async getCurrentStats(
    @Query('coin', new ParseEnumPipe(CryptoCurrency)) coin: CryptoCurrency,
  ) {
    const result = await this.cryptoStatsService.getCurrentStatsById(coin);
    return {
      success: true,
      data: result,
    };
  }

  @Get('deviation')
  @ApiOperation({
    summary: 'Get price standard deviation',
    description:
      'Returns the standard deviation of the price for the last 100 records of the requested cryptocurrency.',
  })
  @ApiQuery({
    name: 'coin',
    enum: CryptoCurrency,
    description: 'The cryptocurrency to calculate standard deviation for',
  })
  @ApiResponse({
    status: 200,
    description: 'Standard deviation of cryptocurrency price',
  })
  async getStandardDeviation(
    @Query('coin', new ParseEnumPipe(CryptoCurrency)) coin: CryptoCurrency,
  ) {
    const result = await this.cryptoStatsService.getStandardDeviationById(coin);
    return {
      success: true,
      data: { deviation: result },
    };
  }

  @Post('run')
  @ApiOperation({ summary: 'Run the cron job manually' })
  @ApiResponse({ status: 200, description: 'Cron job executed successfully.' })
  async runCronJob() {
    const data = await this.cryptoStatsService.runCronJob();
    return {
      success: true,
      data,
    };
  }
}
