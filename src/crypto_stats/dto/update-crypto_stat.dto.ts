import { PartialType } from '@nestjs/swagger';
import { CreateCryptoStatDto } from './create-crypto_stat.dto';

export class UpdateCryptoStatDto extends PartialType(CreateCryptoStatDto) {}
