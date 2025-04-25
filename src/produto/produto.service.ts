import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: createProdutoDto.empresaId },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }
    return this.prisma.produto.create({ data: createProdutoDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1, search, companyId } = paginationDto;

    const where: any = {};

    if (search) {
      where.OR = [{ nome: { contains: search, mode: 'insensitive' } }];
    }

    if (companyId) {
      where.empresaId = Number(companyId);
    }

    const [produtos, totalRecords] = await this.prisma.$transaction([
      this.prisma.produto.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          nome: true,
          criadoEm: true,
          descricao: true,
          unidade: true,
          precoCusto: true,
          precoVenda: true,
          origem: true,
          empresaId: true,
          cfopId: true,
          ncmId: true,
          cstId: true,
          csosnId: true,
        },
        orderBy: {
          criadoEm: 'desc',
        },
      }),
      this.prisma.produto.count({ where }),
    ]);

    return {
      totalRecords,
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      products: produtos,
    };
  }

  async findOne(id: number) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) throw new NotFoundException('Produto não encontrada');
    return produto;
  }

  async update(id: number, dto: UpdateProdutoDto) {
    return this.prisma.produto.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.produto.delete({ where: { id } });
  }
}
