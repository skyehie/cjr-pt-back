import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateAvaliacaoLojaDto } from '../dto/create-avaliacao-loja.dto';
import { UpdateAvaliacaoLojaDto } from '../dto/update-avaliacao-loja.dto';

@Injectable()
export class AvaliacaoLojaService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAvaliacaoLojaDto) {
    const { usuario_id, loja_id } = dto;

    const existeLoja = await this.prisma.loja.findUnique({ where: { id: loja_id } });
    if (!existeLoja) throw new NotFoundException('Loja não encontrada');

    const avaliacaoExistente = await this.prisma.avaliacaoLoja.findFirst({
      where: { usuario_id, loja_id },
    });

    if (avaliacaoExistente) {
      throw new BadRequestException('Usuário já avaliou esta loja.');
    }

    return this.prisma.avaliacaoLoja.create({
      data: {
        usuario_id,
        loja_id,
        nota: dto.nota,
        comentario: dto.comentario,
      },
    });
  }

  async findByLoja(loja_id: number) {
    return this.prisma.avaliacaoLoja.findMany({
      where: { loja_id },
      include: { usuario: true },
    });
  }

  async findOne(id: number) {
    const avaliacao = await this.prisma.avaliacaoLoja.findUnique({
      where: { id },
    });

    if (!avaliacao) throw new NotFoundException('Avaliação não encontrada');

    return avaliacao;
  }

  async update(id: number, userId: number, dto: UpdateAvaliacaoLojaDto) {
    const avaliacao = await this.findOne(id);

    if (avaliacao.usuario_id !== userId) {
      throw new ForbiddenException('Você não pode editar esta avaliação.');
    }

    return this.prisma.avaliacaoLoja.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number, userId: number) {
    const avaliacao = await this.findOne(id);

    if (avaliacao.usuario_id !== userId) {
      throw new ForbiddenException('Você não pode excluir esta avaliação.');
    }

    return this.prisma.avaliacaoLoja.delete({ where: { id } });
  }
}
