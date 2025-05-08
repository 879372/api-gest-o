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
import { CfopService } from './cfop.service';
import { CreateCFOPDto } from './dto/create-cfop.dto';
import { UpdateCfopDto } from './dto/update-cfop.dto';

@Controller('cfop')
export class CfopController {
  constructor(private readonly cfopService: CfopService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Criar novo cfop' })
  create(@Body() createCfopDto: CreateCFOPDto) {
    return this.cfopService.create(createCfopDto);
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
    description: 'Pesquisa o codigo do cfop',
    type: 'string',
  })
  @ApiOperation({ summary: 'Listar todos os cfops' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cfops retornada com sucesso.',
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
    return this.cfopService.findAll(paginationDto);
  }

  @Get('/list-id/:id')
  @ApiOperation({ summary: 'Listar cfop por id' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cfop retornada com sucesso.',
    schema: {
      example: {
        codigo: 5102,
        descricao: 'Dentro do estado',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.cfopService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'atualizar cfop por id' })
  update(@Param('id') id: string, @Body() updateCfopDto: UpdateCfopDto) {
    return this.cfopService.update(+id, updateCfopDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Excluir cfop por id' })
  remove(@Param('id') id: string) {
    return this.cfopService.remove(+id);
  }
}
