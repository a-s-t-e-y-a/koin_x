import { Injectable } from '@nestjs/common';
import { CreateCryptoStatDto } from './dto/create-crypto_stat.dto';
import { UpdateCryptoStatDto } from './dto/update-crypto_stat.dto';

@Injectable()
export class CryptoStatsService {
  create(createCryptoStatDto: CreateCryptoStatDto) {
    return 'This action adds a new cryptoStat';
  }

  findAll() {
    return `This action returns all cryptoStats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cryptoStat`;
  }

  update(id: number, updateCryptoStatDto: UpdateCryptoStatDto) {
    return `This action updates a #${id} cryptoStat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cryptoStat`;
  }
}
