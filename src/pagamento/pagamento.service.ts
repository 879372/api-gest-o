import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';

@Injectable()
export class PagamentoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPagamentoDto: CreatePagamentoDto) {
    return this.prisma.formaPagamento.create({ data: createPagamentoDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1, search } = paginationDto;

    const where: any = {};

    if (search) {
      where.OR = [{ descricao: { contains: search, mode: 'insensitive' } }];
    }

    const [formaPagamento, totalRecords] = await this.prisma.$transaction([
      this.prisma.formaPagamento.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          descricao: true,
        },
      }),
      this.prisma.formaPagamento.count({ where }),
    ]);

    return {
      totalRecords,
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      formaPagamento: formaPagamento,
    };
  }

  async findOne(id: number) {
    const formaPagamento = await this.prisma.formaPagamento.findUnique({
      where: { id },
      select: {
        id: true,
        descricao: true,
      },
    });

    if (!formaPagamento) {
      throw new NotFoundException(`Forma de pagamento não encontrado.`);
    }

    return formaPagamento;
  }

  async update(id: number, updatePagamentoDto: UpdatePagamentoDto) {
    return this.prisma.formaPagamento.update({
      where: { id },
      data: updatePagamentoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.formaPagamento.delete({
      where: { id },
    });
  }
}
