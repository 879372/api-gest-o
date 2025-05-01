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
import { CstService } from './cst.service';
import { CreateCSTDto } from './dto/create-cst.dto';
import { UpdateCstDto } from './dto/update-cst.dto';

@Controller('cst')
export class CstController {
  constructor(private readonly cstService: CstService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Criar novo cst' })
  create(@Body() createCstDto: CreateCSTDto) {
    return this.cstService.create(createCstDto);
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
    description: 'Pesquisa o codigo do cst',
    type: 'string',
  })
  @ApiOperation({ summary: 'Listar todos os csts' })
  @ApiResponse({
    status: 200,
    description: 'Lista de csts retornada com sucesso.',
    schema: {
      example: {
        totalRecords: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
        cfop: [
          {
            codigo: 5102,
            descricao: 'Dentro do estado',
          },
        ],
      },
    },
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.cstService.findAll(paginationDto);
  }

  @Get('/list-id/:id')
  @ApiOperation({ summary: 'Listar cfop por id' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cst retornada com sucesso.',
    schema: {
      example: {
        codigo: 5102,
        descricao: 'Dentro do estado',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.cstService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'atualizar cst por id' })
  update(@Param('id') id: string, @Body() updateCstDto: UpdateCstDto) {
    return this.cstService.update(+id, updateCstDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Excluir cfop por id' })
  remove(@Param('id') id: string) {
    return this.cstService.remove(+id);
  }
}
