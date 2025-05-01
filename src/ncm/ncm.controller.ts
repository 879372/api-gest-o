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
import { CreateNcmDto } from './dto/create-ncm.dto';
import { UpdateNcmDto } from './dto/update-ncm.dto';
import { NcmService } from './ncm.service';

@Controller('ncm')
export class NcmController {
  constructor(private readonly ncmService: NcmService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Criar novo ncm' })
  create(@Body() createNcmDto: CreateNcmDto) {
    return this.ncmService.create(createNcmDto);
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
    description: 'Pesquisa o codigo do ncm',
    type: 'string',
  })
  @ApiOperation({ summary: 'Listar todos os ncms' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cnm retornada com sucesso.',
    schema: {
      example: {
        totalRecords: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
        cfop: [
          {
            id: 1,
            codigo: 5102,
            descricao: 'Dentro do estado',
          },
        ],
      },
    },
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.ncmService.findAll(paginationDto);
  }

  @Get('/list-id/:id')
  @ApiOperation({ summary: 'Listar ncm por id' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cst retornada com sucesso.',
    schema: {
      example: {
        id: 1,
        codigo: 5102,
        descricao: 'Dentro do estado',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.ncmService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'atualizar ncm por id' })
  update(@Param('id') id: string, @Body() updateNcmDto: UpdateNcmDto) {
    return this.ncmService.update(+id, updateNcmDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Excluir ncm por id' })
  remove(@Param('id') id: string) {
    return this.ncmService.remove(+id);
  }
}
