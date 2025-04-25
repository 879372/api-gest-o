import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João da Silva',
    required: false,
  })
  nome?: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
    required: false,
  })
  senha?: string;

  @ApiProperty({ description: 'Id da empresa', example: '10', required: false })
  empresaId?: number;
}
