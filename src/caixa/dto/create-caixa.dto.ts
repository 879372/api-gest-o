import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCaixaDto {
  @ApiProperty({
    example: 100.0,
    description: 'Valor inicial do caixa ao ser aberto',
  })
  @IsNumber()
  valorInicial: number;

  @ApiProperty({
    example: 'Caixa do turno da manhã',
    description: 'Observações sobre o caixa (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  observacoes?: string;

  @ApiProperty({
    example: 'ABERTO',
    description: 'Status do caixa',
    required: false,
  })
  @IsString()
  status: string;

  @ApiProperty({
    example: 1,
    description: 'ID do usuário que está abrindo o caixa',
  })
  @IsInt()
  usuarioId: number;

  @ApiProperty({
    example: 1,
    description: 'ID da empresa associada ao caixa',
  })
  @IsInt()
  empresaId: number;
}
