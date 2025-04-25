import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'O e-mail fornecido não é válido.' })
  @ApiProperty({
    description: 'O endereço de e-mail do usuário.',
    example: 'usuario@dominio.com',
    type: String,
  })
  email: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  @ApiProperty({
    description: 'A senha do usuário para autenticação.',
    example: 'senha123',
    type: String,
  })
  senha: string;
}
