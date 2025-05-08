import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export class VendaItemDto {
  @ApiProperty({ description: 'ID do produto' })
  @IsInt()
  produtoId: number;

  @ApiProperty({ description: 'Quantidade do produto' })
  @IsInt()
  quantidade: number;

  @ApiProperty({ description: 'Valor unitário do produto' })
  @IsNumber()
  @IsPositive()
  valorUnit: number;

  @IsOptional()
  @ApiProperty({ description: 'Subtotal do item', required: false })
  subtotal?: number;

  @ApiProperty({
    description: 'Tipo de desconto (valor ou percentual)',
    required: false,
  })
  @IsOptional()
  @ApiProperty({ enum: ['valor', 'percentual'], required: false })
  tipoDesconto?: 'valor' | 'percentual';

  @ApiProperty({ description: 'Valor do desconto', required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  valorDesconto?: number;
}

class PagamentoVendaDto {
  @ApiProperty({ description: 'ID da forma de pagamento' })
  @IsInt()
  formaPagamentoId: number;

  @ApiProperty({ description: 'Valor pago' })
  @IsNumber()
  @IsPositive()
  valor: number;
}

export class CreateVendaDto {
  @ApiProperty({ description: 'Valor total da venda' })
  @IsNumber()
  valorTotal: number;

  @ApiProperty({ description: 'ID do caixa' })
  @IsInt()
  caixaId: number;

  @ApiProperty({ description: 'ID do cliente' })
  @IsInt()
  clienteId: number;

  @ApiProperty({ description: 'ID da empresa' })
  @IsInt()
  empresaId: number;

  @ApiProperty({ description: 'ID do usuário' })
  @IsInt()
  usuarioId: number;

  @ApiProperty({ enum: ['valor', 'percentual'], required: false })
  @IsOptional()
  tipoDesconto?: 'valor' | 'percentual';

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  valorDesconto?: number;

  @ApiProperty({ type: [VendaItemDto], description: 'Itens da venda' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VendaItemDto)
  itens: VendaItemDto[];

  @ApiProperty({
    type: [PagamentoVendaDto],
    description: 'Pagamentos realizados',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PagamentoVendaDto)
  pagamentos: PagamentoVendaDto[];
}
