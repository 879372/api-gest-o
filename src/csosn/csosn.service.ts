import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCSTDto } from 'src/cst/dto/create-cst.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCsosnDto } from './dto/update-csosn.dto';

@Injectable()
export class CsosnService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCSTDto: CreateCSTDto) {
    return this.prisma.cSOSN.create({ data: createCSTDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1, search } = paginationDto;

    const where: any = {};

    if (search) {
      where.OR = [{ codigo: { contains: search, mode: 'insensitive' } }];
    }

    const [csosn, totalRecords] = await this.prisma.$transaction([
      this.prisma.cSOSN.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          codigo: true,
          descricao: true,
        },
      }),
      this.prisma.cSOSN.count({ where }),
    ]);

    return {
      totalRecords,
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      csosn: csosn,
    };
  }

  async findOne(id: number) {
    const csosn = await this.prisma.cSOSN.findUnique({
      where: { id },
      select: {
        id: true,
        codigo: true,
        descricao: true,
      },
    });

    if (!csosn) {
      throw new NotFoundException(`Csosn não encontrado.`);
    }

    return csosn;
  }

  async update(id: number, updateCsosnDto: UpdateCsosnDto) {
    return this.prisma.cSOSN.update({
      where: { id },
      data: updateCsosnDto,
    });
  }

  async remove(id: number) {
    return this.prisma.cSOSN.delete({
      where: { id },
    });
  }
}
