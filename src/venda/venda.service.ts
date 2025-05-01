import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVendaDto, VendaItemDto } from './dto/create-venda.dto';

@Injectable()
export class VendaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVendaDto: CreateVendaDto) {
    const {
      valorTotal: valorTotalRecebido,
      clienteId,
      empresaId,
      usuarioId,
      itens,
      pagamentos,
      tipoDesconto,
      valorDesconto,
    } = createVendaDto;

    // Verificações de existência
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: clienteId },
    });
    if (!cliente)
      throw new BadRequestException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );

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

    // Verifica existência dos produtos
    for (const item of itens) {
      const produto = await this.prisma.produto.findUnique({
        where: { id: item.produtoId },
      });
      if (!produto) {
        throw new BadRequestException(
          `Produto com ID ${item.produtoId} não encontrado.`,
        );
      }
    }

    // Calcula subtotal com desconto por item
    const calcularSubtotal = (item: VendaItemDto): number => {
      const totalBruto = item.quantidade * item.valorUnit;

      if (!item.tipoDesconto || !item.valorDesconto) return totalBruto;

      if (item.tipoDesconto === 'valor') return totalBruto - item.valorDesconto;
      if (item.tipoDesconto === 'percentual')
        return totalBruto - (totalBruto * item.valorDesconto) / 100;

      return totalBruto;
    };

    const itensComSubtotais = itens.map((item) => ({
      ...item,
      subtotal: calcularSubtotal(item),
    }));

    const valorTotalItens = Number(
      itensComSubtotais
        .reduce((acc, item) => acc + item.subtotal, 0)
        .toFixed(2),
    );

    // Aplica desconto da venda (se houver)
    let valorTotalCalculado = valorTotalItens;

    if (tipoDesconto && valorDesconto) {
      if (tipoDesconto === 'valor') {
        valorTotalCalculado -= valorDesconto;
      } else if (tipoDesconto === 'percentual') {
        valorTotalCalculado -= (valorTotalItens * valorDesconto) / 100;
      }
    }

    valorTotalCalculado = Number(valorTotalCalculado.toFixed(2));

    if (valorTotalRecebido !== valorTotalCalculado) {
      throw new BadRequestException(
        `Valor total da venda divergente. Enviado: ${valorTotalRecebido}, Calculado com descontos: ${valorTotalCalculado}.`,
      );
    }

    const totalPagamentos = pagamentos.reduce((acc, p) => acc + p.valor, 0);
    if (totalPagamentos < valorTotalCalculado) {
      throw new BadRequestException(
        `Total dos pagamentos (${totalPagamentos}) é menor que o valor total da venda (${valorTotalCalculado}).`,
      );
    }

    // Criação
    return this.prisma.venda.create({
      data: {
        valorTotal: valorTotalCalculado,
        status: 'PENDENTE',
        clienteId,
        empresaId,
        usuarioId,
        tipoDesconto,
        valorDesconto,
        itens: {
          create: itensComSubtotais.map(
            ({
              produtoId,
              quantidade,
              valorUnit,
              subtotal,
              tipoDesconto,
              valorDesconto,
            }) => ({
              produtoId,
              quantidade,
              valorUnit,
              subtotal,
              tipoDesconto,
              valorDesconto,
            }),
          ),
        },
        PagamentoVenda: {
          create: pagamentos.map((pagamento) => ({
            formaPagamentoId: pagamento.formaPagamentoId,
            valor: pagamento.valor,
          })),
        },
      },
      include: {
        itens: true,
        PagamentoVenda: true,
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1, search, companyId } = paginationDto;

    const where: any = {};

    if (search) {
      where.OR = [
        { status: { contains: search, mode: 'insensitive' } },
        { cliente: { nome: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (companyId) {
      where.empresaId = Number(companyId);
    }

    const [vendas, totalRecords] = await this.prisma.$transaction([
      this.prisma.venda.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          data: true,
          valorTotal: true,
          status: true,
          tipoDesconto: true,
          valorDesconto: true,
          cliente: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
          empresa: {
            select: {
              id: true,
              nome: true,
            },
          },
          itens: {
            select: {
              produto: {
                select: {
                  id: true,
                  nome: true,
                },
              },
              tipoDesconto: true,
              valorDesconto: true,
              quantidade: true,
              valorUnit: true,
              subtotal: true,
            },
          },
          PagamentoVenda: {
            select: {
              formaPagamento: {
                select: {
                  id: true,
                  descricao: true,
                },
              },
              valor: true,
            },
          },
        },
        orderBy: {
          criadoEm: 'desc',
        },
      }),
      this.prisma.venda.count({ where }),
    ]);

    return {
      totalRecords,
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit),
      sales: vendas,
    };
  }

  async findOne(id: number) {
    const venda = await this.prisma.venda.findUnique({
      where: { id },
      select: {
        id: true,
        data: true,
        valorTotal: true,
        status: true,
        tipoDesconto: true,
        valorDesconto: true,
        cliente: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
        empresa: {
          select: {
            id: true,
            nome: true,
          },
        },
        itens: {
          select: {
            produto: {
              select: {
                id: true,
                nome: true,
              },
            },
            tipoDesconto: true,
            valorDesconto: true,
            quantidade: true,
            valorUnit: true,
            subtotal: true,
          },
        },
        PagamentoVenda: {
          select: {
            formaPagamento: {
              select: {
                id: true,
                descricao: true,
              },
            },
            valor: true,
          },
        },
      },
    });

    if (!venda) {
      throw new NotFoundException(`Venda não encontrada.`);
    }

    return venda;
  }
}
