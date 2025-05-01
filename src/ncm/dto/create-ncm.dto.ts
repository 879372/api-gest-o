import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNcmDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '100',
    description: 'Código do CST',
  })
  codigo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'NCM dentro do estado',
    description: 'Descrição do NCM',
  })
  descricao: string;
}
