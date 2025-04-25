import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    return this.prisma.empresa.create({ data: createEmpresaDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1, search } = paginationDto;

    const where: any = {};

    if (search) {
      where.OR = [
        { fantasia: { contains: search, mode: 'insensitive' } },
        { nome: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [empresas, totalRecords] = await this.prisma.$transaction([
      this.prisma.empresa.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          email: true,
          nome: true,
          fantasia: true,
          bairro: true,
          cep: true,
          cidade: true,
          criadoEm: true,
          documento: true,
          endereco: true,
          telefone: true,
          tipo: true,
          uf: true,
          logo: true,
        },
        orderBy: {
          criadoEm: 'desc',
        },
      }),
      this.prisma.empresa.count({ where }),
    ]);

    return {
      totalRecords,
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      companies: empresas,
    };
  }

  async findOne(id: number) {
    const empresa = await this.prisma.empresa.findUnique({ where: { id } });
    if (!empresa) throw new NotFoundException('Empresa não encontrada');
    return empresa;
  }

  async update(id: number, dto: UpdateEmpresaDto) {
    return this.prisma.empresa.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.empresa.delete({ where: { id } });
  }
}
