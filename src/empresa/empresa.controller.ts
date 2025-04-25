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
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { EmpresaService } from './empresa.service';

@Controller('company')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Criar nova empresa' })
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @Get('/list-all')
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
    example: 'Extreme Software',
    description: 'Pesquisa nome da empresa',
    type: 'string',
  })
  @ApiQuery({
    name: 'companyId',
    required: false,
    example: 1,
    description: 'Pesquisa id da empresa',
    type: 'number',
  })
  @ApiOperation({ summary: 'Listar empresas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de empresas retornada com sucesso.',
    schema: {
      example: {
        totalRecords: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
        companies: [
          {
            id: 5,
            email: 'contato@extreme.com',
            nome: 'Extreme Software',
            fantasia: 'Extreme',
            bairro: 'Centro',
            cep: '01234-567',
            cidade: 'São Paulo',
            criadoEm: '2025-04-25T01:40:40.138Z',
            documento: '12345678900001',
            endereco: 'Rua Exemplo, 123',
            telefone: '84986276144',
            tipo: 'pj',
            uf: 'SP',
            logo: 'data:image/png;base64,...',
          },
        ],
      },
    },
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.empresaService.findAll(paginationDto);
  }

  @Get('/list-id/:id')
  @ApiOperation({ summary: 'Listar empresa por id' })
  @ApiResponse({
    status: 200,
    description: 'Lista de empresa retornada com sucesso.',
    schema: {
      example: {
        id: 5,
        email: 'contato@extreme.com',
        nome: 'Extreme Software',
        fantasia: 'Extreme',
        bairro: 'Centro',
        cep: '01234-567',
        cidade: 'São Paulo',
        criadoEm: '2025-04-25T01:40:40.138Z',
        documento: '12345678900001',
        endereco: 'Rua Exemplo, 123',
        telefone: '84986276144',
        tipo: 'pj',
        uf: 'SP',
        logo: 'data:image/png;base64,...',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Atualizar empresa por id' })
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.update(+id, updateEmpresaDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Excluir empresa por id' })
  remove(@Param('id') id: string) {
    return this.empresaService.remove(+id);
  }
}
