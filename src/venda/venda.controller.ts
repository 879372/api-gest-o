import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateVendaDto } from './dto/create-venda.dto';
import { VendaService } from './venda.service';

@ApiTags('Vendas')
@Controller('sales')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Criar uma nova venda' })
  create(@Body() createVendaDto: CreateVendaDto) {
    return this.vendaService.create(createVendaDto);
  }

  @Get('/list-all')
  @ApiOperation({ summary: 'Listar vendas' })
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
    description: 'Pesquisa venda',
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
    description: 'Lista de vendas retornada com sucesso.',
    schema: {
      example: {
        totalRecords: 6,
        page: 1,
        limit: 10,
        totalPages: 1,
        sales: [
          {
            id: 8,
            data: '2025-05-01T17:08:21.415Z',
            valorTotal: 16.2,
            status: 'PENDENTE',
            tipoDesconto: 'percentual',
            valorDesconto: 10,
            cliente: {
              id: 3,
              nome: 'João da Silva',
              email: 'cliente@email.com',
            },
            empresa: {
              id: 5,
              nome: 'Extreme Software',
            },
            itens: [
              {
                produto: {
                  id: 5,
                  nome: 'Camiseta',
                },
                tipoDesconto: 'percentual',
                valorDesconto: '10',
                quantidade: 2,
                valorUnit: '10',
                subtotal: '18',
              },
            ],
            PagamentoVenda: [
              {
                formaPagamento: {
                  id: 1,
                  descricao: 'DINHEIRO',
                },
                valor: 16.2,
              },
            ],
          },
        ],
      },
    },
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.vendaService.findAll(paginationDto);
  }

  @Get('/list-id/:id')
  @ApiOperation({ summary: 'Listar venda por id' })
  @ApiResponse({
    status: 200,
    description: 'Venda retornada com sucesso.',
    schema: {
      example: {
        id: 8,
        data: '2025-05-01T17:08:21.415Z',
        valorTotal: 16.2,
        status: 'PENDENTE',
        tipoDesconto: 'percentual',
        valorDesconto: 10,
        cliente: {
          id: 3,
          nome: 'João da Silva',
          email: 'cliente@email.com',
        },
        empresa: {
          id: 5,
          nome: 'Extreme Software',
        },
        itens: [
          {
            produto: {
              id: 5,
              nome: 'Camiseta',
            },
            tipoDesconto: 'percentual',
            valorDesconto: '10',
            quantidade: 2,
            valorUnit: '10',
            subtotal: '18',
          },
        ],
        PagamentoVenda: [
          {
            formaPagamento: {
              id: 1,
              descricao: 'DINHEIRO',
            },
            valor: 16.2,
          },
        ],
      },
    },
  })
  async findOne(@Param('id') id: string) {
    return this.vendaService.findOne(+id);
  }
}
