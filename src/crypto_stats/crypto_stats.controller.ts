import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CryptoStatsService } from './crypto_stats.service';
import { CreateCryptoStatDto } from './dto/create-crypto_stat.dto';
import { UpdateCryptoStatDto } from './dto/update-crypto_stat.dto';

@Controller('crypto-stats')
export class CryptoStatsController {
  constructor(private readonly cryptoStatsService: CryptoStatsService) {}

  @Post()
  create(@Body() createCryptoStatDto: CreateCryptoStatDto) {
    return this.cryptoStatsService.create(createCryptoStatDto);
  }

  @Get()
  findAll() {
    return this.cryptoStatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cryptoStatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCryptoStatDto: UpdateCryptoStatDto) {
    return this.cryptoStatsService.update(+id, updateCryptoStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptoStatsService.remove(+id);
  }
}
