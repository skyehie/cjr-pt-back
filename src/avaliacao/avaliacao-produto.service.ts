import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateAvaliacaoProdutoDto } from '../dto/create-avaliacao-produto.dto';
import { UpdateAvaliacaoProdutoDto } from '../dto/update-avaliacao-produto.dto';

@Injectable()
export class AvaliacaoProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAvaliacaoProdutoDto) {
    const { usuario_id, produto_id } = dto;

    const produto = await this.prisma.produto.findUnique({ where: { id: produto_id } });
    if (!produto) throw new NotFoundException('Produto não encontrado');

    const avaliacaoExistente = await this.prisma.avaliacaoProduto.findFirst({
      where: { usuario_id, produto_id },
    });

    if (avaliacaoExistente) {
      throw new BadRequestException('Usuário já avaliou este produto.');
    }

    return this.prisma.avaliacaoProduto.create({
      data: {
        usuario_id,
        produto_id,
        nota: dto.nota,
        comentario: dto.comentario,
      },
    });
  }

  async findByProduto(produto_id: number) {
    return this.prisma.avaliacaoProduto.findMany({
      where: { produto_id },
      include: { usuario: true },
    });
  }

  async findOne(id: number) {
    const avaliacao = await this.prisma.avaliacaoProduto.findUnique({
      where: { id },
    });

    if (!avaliacao) throw new NotFoundException('Avaliação não encontrada');

    return avaliacao;
  }

  async update(id: number, userId: number, dto: UpdateAvaliacaoProdutoDto) {
    const avaliacao = await this.findOne(id);

    if (avaliacao.usuario_id !== userId) {
      throw new ForbiddenException('Você não pode editar esta avaliação.');
    }

    return this.prisma.avaliacaoProduto.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number, userId: number) {
    const avaliacao = await this.findOne(id);

    if (avaliacao.usuario_id !== userId) {
      throw new ForbiddenException('Você não pode excluir esta avaliação.');
    }

    return this.prisma.avaliacaoProduto.delete({
      where: { id },
    });
  }
}
