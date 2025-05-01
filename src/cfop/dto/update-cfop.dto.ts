import { PartialType } from '@nestjs/swagger';
import { CreateCFOPDto } from './create-cfop.dto';

export class UpdateCfopDto extends PartialType(CreateCFOPDto) {}
