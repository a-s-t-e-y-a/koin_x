import { Controller, Get, Query, ParseEnumPipe } from '@nestjs/common';
import { CryptoStatsService } from './crypto_stats.service';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { CryptoCurrency, GetCryptoDto } from './dto/get_crypto.dto';

@ApiTags('Crypto Statistics')
@Controller('stats')
export class CryptoStatsController {
  constructor(private readonly cryptoStatsService: CryptoStatsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get latest cryptocurrency data',
    description: 'Returns the latest data about the requested cryptocurrency.',
  })
  @ApiQuery({
    name: 'coin',
    enum: CryptoCurrency,
    description: 'The cryptocurrency to fetch data for',
  })
  async getCurrentStats(
    @Query('coin', new ParseEnumPipe(CryptoCurrency)) coin: CryptoCurrency,
  ) {
    const result = await this.cryptoStatsService.getCurrentStatsById(coin);
    return {
      success: true,
      data: result,
    };
  }
}
