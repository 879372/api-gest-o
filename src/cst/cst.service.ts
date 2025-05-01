import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCSTDto } from './dto/create-cst.dto';
import { UpdateCstDto } from './dto/update-cst.dto';

@Injectable()
export class CstService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCSTDto: CreateCSTDto) {
    return this.prisma.cST.create({ data: createCSTDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1, search } = paginationDto;

    const where: any = {};

    if (search) {
      where.OR = [{ codigo: { contains: search, mode: 'insensitive' } }];
    }

    const [cst, totalRecords] = await this.prisma.$transaction([
      this.prisma.cST.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          codigo: true,
          descricao: true,
        },
      }),
      this.prisma.cST.count({ where }),
    ]);

    return {
      totalRecords,
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      cst: cst,
    };
  }

  async findOne(id: number) {
    const cst = await this.prisma.cST.findUnique({
      where: { id },
      select: {
        id: true,
        descricao: true,
      },
    });

    if (!cst) {
      throw new NotFoundException(`cst não encontrado.`);
    }

    return cst;
  }

  async update(id: number, updateCstDto: UpdateCstDto) {
    return this.prisma.cST.update({
      where: { id },
      data: updateCstDto,
    });
  }

  async remove(id: number) {
    return this.prisma.cST.delete({
      where: { id },
    });
  }
}
