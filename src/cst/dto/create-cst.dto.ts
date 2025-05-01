import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCSTDto {
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
    example: 'CST dentro do estado',
    description: 'Descrição do CST',
  })
  descricao: string;
}
