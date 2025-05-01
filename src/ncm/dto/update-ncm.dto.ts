import { PartialType } from '@nestjs/swagger';
import { CreateNcmDto } from './create-ncm.dto';

export class UpdateNcmDto extends PartialType(CreateNcmDto) {}
