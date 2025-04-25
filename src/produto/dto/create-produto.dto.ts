import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @ApiProperty({ example: 'Camiseta', description: 'Nome do produto' })
  nome: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Camiseta de algodão', required: false })
  descricao?: string;

  @IsString()
  @ApiProperty({ example: 'UN', description: 'Unidade do produto' })
  unidade: string;

  @IsNumber()
  @ApiProperty({ example: 10.5, description: 'Preço de custo' })
  precoCusto: number;

  @IsNumber()
  @ApiProperty({ example: 25.0, description: 'Preço de venda' })
  precoVenda: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'nacional', description: 'Origem do produto' })
  origem?: string;

  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID da empresa' })
  empresaId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID do CFOP' })
  cfopId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID do NCM' })
  ncmId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID do CST' })
  cstId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 1,
    required: false,
    description: 'ID do CSOSN (opcional)',
  })
  csosnId?: number;
}
