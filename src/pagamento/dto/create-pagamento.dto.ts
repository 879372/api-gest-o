import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreatePagamentoDto {
  @IsString()
  @MinLength(2, { message: 'A descrição deve ter pelo menos 2 caracteres.' })
  @ApiProperty({
    example: 'DINHEIRO',
    description: 'Descrição da forma de pagamento',
  })
  descricao: string;
}
