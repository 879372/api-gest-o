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
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoService } from './produto.service';

@Controller('product')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Criar novo produto' })
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get('/list-all')
  @ApiOperation({ summary: 'Listar Produtos' })
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
    example: 'camisa',
    description: 'Pesquisa nome do produto',
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
    description: 'Lista de produtos retornada com sucesso.',
    schema: {
      example: {
        totalRecords: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
        products: [
          {
            id: 5,
            nome: 'Camiseta',
            criadoEm: '2025-04-25T03:25:45.150Z',
            descricao: 'Camiseta de algodão',
            unidade: 'UN',
            precoCusto: '10.5',
            precoVenda: '25',
            origem: null,
            empresaId: 5,
            cfopId: null,
            ncmId: null,
            cstId: null,
            csosnId: null,
          },
        ],
      },
    },
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.produtoService.findAll(paginationDto);
  }

  @Get('/list-id/:id')
  @ApiOperation({ summary: 'Listar Produto por id' })
  @ApiResponse({
    status: 200,
    description: 'Produto retornado com sucesso.',
    schema: {
      example: {
        id: 5,
        nome: 'Camiseta',
        criadoEm: '2025-04-25T03:25:45.150Z',
        descricao: 'Camiseta de algodão',
        unidade: 'UN',
        precoCusto: '10.5',
        precoVenda: '25',
        origem: null,
        empresaId: 5,
        cfopId: null,
        ncmId: null,
        cstId: null,
        csosnId: null,
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Atualizar Produto por id' })
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Excluir Produto por id' })
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
