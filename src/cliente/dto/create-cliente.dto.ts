import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString, Matches } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @ApiProperty({ example: 'João da Silva' })
  nome: string;

  @IsString()
  @Matches(/^(pf|pj)$/)
  @ApiProperty({ example: 'pf', description: 'Tipo do cliente: pf ou pj' })
  tipo: string;

  @IsString()
  @ApiProperty({
    example: '12345678901',
    description: 'CPF ou CNPJ do cliente',
  })
  documento: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '123456789', required: false })
  inscricaoEstadual?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'cliente@email.com', required: false })
  email?: string;

  @IsOptional()
  @Matches(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/)
  @ApiProperty({ example: '11987654321', required: false })
  telefone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '01234-567', required: false })
  cep?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'SP', required: false })
  uf?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Centro', required: false })
  bairro?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'São Paulo', required: false })
  cidade?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Rua Exemplo, 123', required: false })
  endereco?: string;

  @IsInt()
  @ApiProperty({ example: 1, description: 'ID da empresa associada' })
  empresaId: number;
}
