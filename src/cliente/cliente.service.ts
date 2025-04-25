import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateClienteDto) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: dto.empresaId },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return this.prisma.cliente.create({ data: dto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1, search, companyId } = paginationDto;

    const where: any = {};

    if (search) {
      where.OR = [
        { fantasia: { contains: search, mode: 'insensitive' } },
        { nome: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (companyId) {
      where.empresaId = Number(companyId);
    }

    const [clientes, totalRecords] = await this.prisma.$transaction([
      this.prisma.cliente.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          email: true,
          nome: true,
          bairro: true,
          cep: true,
          cidade: true,
          criadoEm: true,
          documento: true,
          endereco: true,
          telefone: true,
          tipo: true,
          uf: true,
          inscricaoEstadual: true,
          empresaId: true,
        },
        orderBy: {
          criadoEm: 'desc',
        },
      }),
      this.prisma.cliente.count({ where }),
    ]);

    return {
      totalRecords,
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      customers: clientes,
    };
  }

  async findOne(id: number) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');
    return cliente;
  }

  async update(id: number, dto: UpdateClienteDto) {
    await this.findOne(id);
    return this.prisma.cliente.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.cliente.delete({ where: { id } });
  }
}
