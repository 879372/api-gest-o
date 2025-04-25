import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @ApiProperty({ description: 'Nome do usuário', example: 'João da Silva' })
  nome: string;

  @IsEmail({}, { message: 'O email deve ser um email válido' })
  @ApiProperty({ description: 'Email do usuário', example: 'joao@example.com' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @ApiProperty({ description: 'Senha do usuário', example: '123456' })
  senha: string;

  @IsInt({ message: 'O ID da empresa deve ser um número inteiro' })
  @ApiProperty({ description: 'Id da empresa', example: '10' })
  empresaId: number;
}
