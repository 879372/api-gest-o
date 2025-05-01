import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCFOPDto {
  @IsString({ message: 'Deve ser uma string' })
  @IsNotEmpty({ message: 'Não pode ser vazio' })
  @ApiProperty({
    example: '1001',
    description: 'Código do CFOP',
  })
  codigo: string;

  @IsString({ message: 'Deve ser uma string' })
  @IsNotEmpty({ message: 'Não pode ser vazio' })
  @ApiProperty({
    example: 'cfop dentro do estado',
    description: 'Descrição do CFOP',
  })
  descricao: string;
}
