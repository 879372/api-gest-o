import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNcmDto } from './dto/create-ncm.dto';
import { UpdateNcmDto } from './dto/update-ncm.dto';

@Injectable()
export class NcmService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNcmDto: CreateNcmDto) {
    return this.prisma.nCM.create({ data: createNcmDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1, search } = paginationDto;

    const where: any = {};

    if (search) {
      where.OR = [{ codigo: { contains: search, mode: 'insensitive' } }];
    }

    const [ncm, totalRecords] = await this.prisma.$transaction([
      this.prisma.nCM.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          codigo: true,
          descricao: true,
        },
      }),
      this.prisma.nCM.count({ where }),
    ]);

    return {
      totalRecords,
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      ncm: ncm,
    };
  }

  async findOne(id: number) {
    const ncm = await this.prisma.nCM.findUnique({
      where: { id },
      select: {
        id: true,
        codigo: true,
        descricao: true,
      },
    });

    if (!ncm) {
      throw new NotFoundException(`cst não encontrado.`);
    }

    return ncm;
  }

  async update(id: number, updateNcmDto: UpdateNcmDto) {
    return this.prisma.nCM.update({
      where: { id },
      data: updateNcmDto,
    });
  }

  async remove(id: number) {
    return this.prisma.nCM.delete({
      where: { id },
    });
  }
}
