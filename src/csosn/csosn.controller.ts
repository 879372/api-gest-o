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
import { CsosnService } from './csosn.service';
import { CreateCsosnDto } from './dto/create-csosn.dto';
import { UpdateCsosnDto } from './dto/update-csosn.dto';

@Controller('csosn')
export class CsosnController {
  constructor(private readonly csosnService: CsosnService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Criar novo csosn' })
  create(@Body() createCsosnDto: CreateCsosnDto) {
    return this.csosnService.create(createCsosnDto);
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
    description: 'Pesquisa o codigo do csosn',
    type: 'string',
  })
  @ApiOperation({ summary: 'Listar todos os csosn' })
  @ApiResponse({
    status: 200,
    description: 'Lista de csosn retornada com sucesso.',
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
    return this.csosnService.findAll(paginationDto);
  }

  @Get('/list-id/:id')
  @ApiOperation({ summary: 'Listar csosn por id' })
  @ApiResponse({
    status: 200,
    description: 'Lista de csosn retornada com sucesso.',
    schema: {
      example: {
        codigo: 5102,
        descricao: 'Dentro do estado',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.csosnService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'atualizar csosn por id' })
  update(@Param('id') id: string, @Body() updateCsosnDto: UpdateCsosnDto) {
    return this.csosnService.update(+id, updateCsosnDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Excluir csosn por id' })
  remove(@Param('id') id: string) {
    return this.csosnService.remove(+id);
  }
}
