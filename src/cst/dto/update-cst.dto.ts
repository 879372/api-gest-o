import { PartialType } from '@nestjs/swagger';
import { CreateCSTDto } from './create-cst.dto';

export class UpdateCstDto extends PartialType(CreateCSTDto) {}
