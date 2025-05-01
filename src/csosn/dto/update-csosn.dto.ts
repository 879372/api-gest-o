import { PartialType } from '@nestjs/swagger';
import { CreateCsosnDto } from './create-csosn.dto';

export class UpdateCsosnDto extends PartialType(CreateCsosnDto) {}
