import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  @ApiProperty({ example: 'Extreme Software', description: 'Nome da empresa' })
  nome: string;

  @IsString()
  @Matches(/^(pf|pj)$/)
  @ApiProperty({ example: 'pj', description: 'Tipo da empresa (pf ou pj)' })
  tipo: string;

  @IsString()
  @ApiProperty({ example: '12345678900001', description: 'CPF ou CNPJ' })
  documento: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Extreme',
    description: 'Nome fantasia da empresa',
    required: false,
  })
  fantasia?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'contato@extreme.com', required: false })
  email?: string;

  @IsOptional()
  @Matches(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/)
  @ApiProperty({ example: '84986276144', required: false })
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
  @ApiProperty({
    example: 'data:image/png;base64,...',
    description: 'Logo da empresa em base64',
    required: false,
  })
  logo?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Rua Exemplo, 123', required: false })
  endereco?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '123456789',
    required: false,
    description: 'Inscrição Estadual',
  })
  inscricaoEstadual?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '987654321',
    required: false,
    description: 'Inscrição Municipal',
  })
  inscricaoMunicipal?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'SN',
    required: false,
    description:
      'Regime tributário: SN (Simples Nacional), LP (Lucro Presumido), LR (Lucro Real)',
  })
  regimeTributario?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'ABCD1234',
    required: false,
    description: 'Código de Segurança do Contribuinte (CSC)',
  })
  csc?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '001',
    required: false,
    description: 'Identificador do CSC',
  })
  cscId?: string;
}
