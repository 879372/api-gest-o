import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDecimal, IsOptional } from 'class-validator';
import { CreateCaixaDto } from './create-caixa.dto';

export class UpdateCaixaDto extends PartialType(CreateCaixaDto) {
  @ApiProperty({
    example: '2024-07-30T18:00:00.000Z',
    description: 'Data e hora de fechamento do caixa',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dataFechamento?: string;

  @ApiProperty({
    example: 500.0,
    description: 'Valor final no fechamento do caixa',
    required: false,
  })
  @IsOptional()
  @IsDecimal()
  valorFinal?: number;
}
