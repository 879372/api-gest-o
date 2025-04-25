import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuários')
@Controller('user')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Criar novo usuário' })
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get('/list-all')
  @ApiOperation({ summary: 'Listar usuários' })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Número da página',
    type: 'number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Quantidade de itens por página',
    type: 'number',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'Maria',
    description: 'Pesquisa nome do usuário',
    type: 'string',
  })
  @ApiQuery({
    name: 'companyId',
    required: false,
    example: 1,
    description: 'Pesquisa id da empresa',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
    schema: {
      example: {
        totalRecords: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
        users: [
          {
            id: 2,
            email: 'joao@example.com',
            nome: 'João da Silva',
            empresaId: 3,
          },
        ],
      },
    },
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.usuarioService.findAll(paginationDto);
  }

  @Get('/list-id/:id')
  @ApiOperation({ summary: 'Listar usuário por id' })
  @ApiResponse({
    status: 200,
    description: 'Usuário retornado com sucesso.',
    schema: {
      example: {
        id: 2,
        email: 'joao@example.com',
        nome: 'João da Silva',
        empresaId: 3,
      },
    },
  })
  async findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Atualizar usuário por id' })
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete('/delete:id')
  @ApiOperation({ summary: 'Excluir usuário por id' })
  async remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
