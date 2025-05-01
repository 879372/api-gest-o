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
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { PagamentoService } from './pagamento.service';

@Controller('payment')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Criar nova forma de pagamento' })
  create(@Body() createPagamentoDto: CreatePagamentoDto) {
    return this.pagamentoService.create(createPagamentoDto);
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
    description: 'Pesquisa a descrição da forma de pagamento',
    type: 'string',
  })
  @ApiOperation({ summary: 'Listar todas as formas de pagamento' })
  @ApiResponse({
    status: 200,
    description: 'Lista de forma de pagamento retornada com sucesso.',
    schema: {
      example: {
        totalRecords: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
        cfop: [
          {
            id: 1,
            descricao: 'PIX',
          },
        ],
      },
    },
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.pagamentoService.findAll(paginationDto);
  }

  @Get('/list-id/:id')
  @ApiOperation({ summary: 'Listar forma de pagamento por id' })
  @ApiResponse({
    status: 200,
    description: 'Lista de forma de pagamento retornada com sucesso.',
    schema: {
      example: {
        id: 1,
        descricao: 'DINHEIRO',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.pagamentoService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'atualizar forma de pagamento por id' })
  update(
    @Param('id') id: string,
    @Body() updatePagamentoDto: UpdatePagamentoDto,
  ) {
    return this.pagamentoService.update(+id, updatePagamentoDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Excluir forma de pagamento por id' })
  remove(@Param('id') id: string) {
    return this.pagamentoService.remove(+id);
  }
}
