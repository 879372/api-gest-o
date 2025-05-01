import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCsosnDto {
  @IsString({ message: 'Deve ser uma string' })
  @IsNotEmpty({ message: 'Não pode ser vazio' })
  @ApiProperty({
    example: '1001',
    description: 'Código do CSOSN',
  })
  codigo: string;

  @IsString({ message: 'Deve ser uma string' })
  @IsNotEmpty({ message: 'Não pode ser vazio' })
  @ApiProperty({
    example: 'CSOSN dentro do estado',
    description: 'Descrição do CSOSN',
  })
  descricao: string;
}
