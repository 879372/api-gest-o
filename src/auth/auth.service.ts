import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import jwtConfig from './config/jwt.config';
import { LoginDto } from './dto/login.dto';
import { HashingService } from './hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    let passwordValid = false;
    let error = true;

    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (usuario) {
      passwordValid = await this.hashingService.comparePassword(
        loginDto.senha,
        usuario.senha,
      );
    }

    if (passwordValid) {
      error = false;
    }

    if (!usuario || !passwordValid) {
      throw new UnauthorizedException('Usuário ou senha inválido');
    }

    const acessToken = await this.jwtService.signAsync(
      {
        sub: usuario.id,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.jwtTtl,
      },
    );

    return {
      id_usuario: usuario.id,
      email: usuario.email,
      id_empresa: usuario.empresaId,
      acessToken,
    };
  }
}
