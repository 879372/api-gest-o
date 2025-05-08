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
import { CaixaService } from './caixa.service';
import { CreateCaixaDto } from './dto/create-caixa.dto';
import { UpdateCaixaDto } from './dto/update-caixa.dto';

@Controller('box')
export class CaixaController {
  constructor(private readonly caixaService: CaixaService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Criar abertura de caixa' })
  create(@Body() createCaixaDto: CreateCaixaDto) {
    return this.caixaService.create(createCaixaDto);
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
    description: 'Limite de registros por página',
    type: 'number',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    example: '5102',
    description: 'Pesquisa o codigo do caixa',
    type: 'string',
  })
  @ApiQuery({
    name: 'companyId',
    required: false,
    example: '5',
    description: 'Pesquisa o id da empresa',
    type: 'string',
  })
  @ApiOperation({ summary: 'Listar todos os caixas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de caixas retornada com sucesso.',
    schema: {
      example: {
        totalRecords: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
        boxes: [
          {
            id: 2,
            dataAbertura: '2025-05-07T23:28:54.041Z',
            dataFechamento: null,
            valorInicial: '100',
            valorFinal: null,
            usuario: {
              id: 3,
              nome: 'João da Silva',
            },
            empresa: {
              id: 5,
              nome: 'Extreme Software',
            },
            formasPagamento: [
              {
                formaPagamento: 'DINHEIRO',
                valorTotal: 22.2,
              },
            ],
          },
        ],
      },
    },
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.caixaService.findAll(paginationDto);
  }

  @Get('/list-id/:id')
  @ApiOperation({ summary: 'Listar caixa por id' })
  @ApiResponse({
    status: 200,
    description: 'Caixa retornado com sucesso.',
    schema: {
      example: {
        id: 2,
        dataAbertura: '2025-05-07T23:28:54.041Z',
        dataFechamento: null,
        valorInicial: '100',
        valorFinal: null,
        usuario: {
          id: 3,
          nome: 'João da Silva',
        },
        empresa: {
          id: 5,
          nome: 'Extreme Software',
        },
        formasPagamento: [
          {
            formaPagamento: 'DINHEIRO',
            valorTotal: 22.2,
          },
        ],
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.caixaService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Atualizar caixa por id' })
  update(@Param('id') id: string, @Body() updateCaixaDto: UpdateCaixaDto) {
    return this.caixaService.update(+id, updateCaixaDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Excluir caixa por id' })
  remove(@Param('id') id: string) {
    return this.caixaService.remove(+id);
  }
}
