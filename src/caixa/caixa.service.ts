import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCaixaDto } from './dto/create-caixa.dto';
import { UpdateCaixaDto } from './dto/update-caixa.dto';

@Injectable()
export class CaixaService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCaixaDto: CreateCaixaDto) {
    const { empresaId, usuarioId } = createCaixaDto;

    const empresa = await this.prisma.empresa.findUnique({
      where: { id: empresaId },
    });

    if (!empresa)
      throw new BadRequestException(
        `Empresa com ID ${empresaId} não encontrada.`,
      );

    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario)
      throw new BadRequestException(
        `Usuário com ID ${usuarioId} não encontrado.`,
      );

    return this.prisma.caixa.create({ data: createCaixaDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1, companyId, status } = paginationDto;

    const where: any = {};

    if (status) {
      where.OR = [{ status: { contains: status, mode: 'insensitive' } }];
    }

    if (companyId) {
      where.empresaId = Number(companyId);
    }

    const [caixas, totalRecords] = await this.prisma.$transaction([
      this.prisma.caixa.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          dataAbertura: true,
          dataFechamento: true,
          valorInicial: true,
          valorFinal: true,
          status: true,
          usuario: {
            select: {
              id: true,
              nome: true,
            },
          },
          empresa: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      }),
      this.prisma.caixa.count({ where }),
    ]);

    // Buscar formas de pagamento para cada caixa
    const caixasComPagamentos = await Promise.all(
      caixas.map(async (caixa) => {
        const pagamentos = await this.prisma.pagamentoVenda.findMany({
          where: {
            venda: {
              caixaId: caixa.id,
            },
          },
          include: {
            formaPagamento: true,
          },
        });

        const formasPagamento = pagamentos.reduce(
          (acc, curr) => {
            const nome = curr.formaPagamento.descricao;
            acc[nome] = (acc[nome] || 0) + Number(curr.valor);
            return acc;
          },
          {} as Record<string, number>,
        );

        const formasPagamentoArray = Object.entries(formasPagamento).map(
          ([formaPagamento, valorTotal]) => ({
            formaPagamento,
            valorTotal,
          }),
        );

        return {
          ...caixa,
          formasPagamento: formasPagamentoArray,
        };
      }),
    );

    return {
      totalRecords,
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      boxes: caixasComPagamentos,
    };
  }

  async findOne(id: number) {
    const caixa = await this.prisma.caixa.findUnique({
      where: { id },
      select: {
        id: true,
        dataAbertura: true,
        dataFechamento: true,
        valorInicial: true,
        valorFinal: true,
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        empresa: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    if (!caixa) {
      throw new NotFoundException(`Caixa não encontrado.`);
    }

    // Buscar os pagamentos das vendas associadas a este caixa
    const pagamentos = await this.prisma.pagamentoVenda.findMany({
      where: {
        venda: {
          caixaId: id,
        },
      },
      include: {
        formaPagamento: true,
      },
    });

    const formasPagamento = pagamentos.reduce(
      (acc, curr) => {
        const nome = curr.formaPagamento.descricao;
        acc[nome] = (acc[nome] || 0) + Number(curr.valor);
        return acc;
      },
      {} as Record<string, number>,
    );

    const formasPagamentoArray = Object.entries(formasPagamento).map(
      ([formaPagamento, valorTotal]) => ({
        formaPagamento,
        valorTotal,
      }),
    );

    return {
      ...caixa,
      formasPagamento: formasPagamentoArray,
    };
  }

  update(id: number, updateCaixaDto: UpdateCaixaDto) {
    return this.prisma.caixa.update({
      where: { id },
      data: updateCaixaDto,
    });
  }

  remove(id: number) {
    return this.prisma.caixa.delete({
      where: { id },
    });
  }
}
