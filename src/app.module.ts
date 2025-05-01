import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { EmpresaModule } from './empresa/empresa.module';
import { ClienteModule } from './cliente/cliente.module';
import { ProdutoModule } from './produto/produto.module';
import { CfopModule } from './cfop/cfop.module';
import { NcmModule } from './ncm/ncm.module';
import { CstModule } from './cst/cst.module';
import { CsosnModule } from './csosn/csosn.module';

@Module({
  imports: [PrismaModule, AuthModule, EmpresaModule, ClienteModule, ProdutoModule, CfopModule, NcmModule, CstModule, CsosnModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [],
})
export class AppModule {}
