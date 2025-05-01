import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCFOPDto } from './dto/create-cfop.dto';
import { UpdateCfopDto } from './dto/update-cfop.dto';

@Injectable()
export class CfopService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCFOPDto: CreateCFOPDto) {
    return this.prisma.cFOP.create({ data: createCFOPDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1, search } = paginationDto;

    const where: any = {};

    if (search) {
      where.OR = [{ codigo: { contains: search, mode: 'insensitive' } }];
    }

    const [cfop, totalRecords] = await this.prisma.$transaction([
      this.prisma.cFOP.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          codigo: true,
          descricao: true,
        },
      }),
      this.prisma.cFOP.count({ where }),
    ]);

    return {
      totalRecords,
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      cfop: cfop,
    };
  }

  async findOne(id: number) {
    const cfop = await this.prisma.cFOP.findUnique({
      where: { id },
      select: {
        id: true,
        descricao: true,
      },
    });

    if (!cfop) {
      throw new NotFoundException(`Cfop não encontrado.`);
    }

    return cfop;
  }

  async update(id: number, updateCfopDto: UpdateCfopDto) {
    return this.prisma.cFOP.update({
      where: { id },
      data: updateCfopDto,
    });
  }

  async remove(id: number) {
    return this.prisma.cFOP.delete({
      where: { id },
    });
  }
}
