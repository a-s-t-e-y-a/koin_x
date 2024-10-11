import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CryptoCurrency {
  BITCOIN = 'bitcoin',
  ETHEREUM = 'ethereum',
  MATIC = 'matic-network',
}

export class GetCryptoDto {
  @ApiProperty({
    enum: CryptoCurrency,
    description: 'The cryptocurrency to fetch data for',
    example: CryptoCurrency.BITCOIN,
  })
  @IsEnum(CryptoCurrency)
  coin: CryptoCurrency;
}
