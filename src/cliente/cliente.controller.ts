import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@ApiTags('Clientes')
@Controller('customers')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Criar um novo cliente' })
  create(@Body() dto: CreateClienteDto) {
    return this.clienteService.create(dto);
  }

  @Get('/list-all')
  @ApiOperation({ summary: 'Listar todos os clientes' })
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
    example: 'João',
    description: 'Pesquisa nome do cliente',
    type: 'string',
  })
  @ApiQuery({
    name: 'companyId',
    required: false,
    example: 1,
    description: 'Pesquisa id do cliente',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes retornada com sucesso.',
    schema: {
      example: {
        totalRecords: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
        customers: [
          {
            id: 3,
            email: 'cliente@email.com',
            nome: 'João da Silva',
            bairro: 'Centro',
            cep: '01234-567',
            cidade: 'São Paulo',
            criadoEm: '2025-04-25T02:40:42.708Z',
            documento: '12345678901',
            endereco: 'Rua Exemplo, 123',
            telefone: '11987654321',
            tipo: 'pf',
            uf: 'SP',
            inscricaoEstadual: '123456789',
            empresaId: 5,
          },
        ],
      },
    },
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clienteService.findAll(paginationDto);
  }

  @Get('/list-id/:id')
  @ApiOperation({ summary: 'Buscar um cliente por ID' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cliente retornada com sucesso.',
    schema: {
      example: {
        id: 3,
        email: 'cliente@email.com',
        nome: 'João da Silva',
        bairro: 'Centro',
        cep: '01234-567',
        cidade: 'São Paulo',
        criadoEm: '2025-04-25T02:40:42.708Z',
        documento: '12345678901',
        endereco: 'Rua Exemplo, 123',
        telefone: '11987654321',
        tipo: 'pf',
        uf: 'SP',
        inscricaoEstadual: '123456789',
        empresaId: 5,
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.findOne(id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Atualizar um cliente por ID' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateClienteDto) {
    return this.clienteService.update(id, dto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Remover um cliente por ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.remove(id);
  }
}
