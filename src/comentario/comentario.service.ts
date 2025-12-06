import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateComentarioDto } from '../dto/create-comentario.dto';
import { UpdateComentarioDto } from '../dto/update-comentario.dto';

@Injectable()
export class ComentarioService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateComentarioDto) {
    return this.prisma.comentarioAvaliacao.create({
      data: {
        usuario_id: dto.usuario_id,
        comentario: dto.comentario,
        avaliacao_loja_id: dto.avaliacao_loja_id ?? null,
        avaliacao_produto_id: dto.avaliacao_produto_id ?? null,
      },
    });
  }

  findAll() {
    return this.prisma.comentarioAvaliacao.findMany({
      include: {
        usuario: true,
        avaliacaoLoja: true,
        avaliacaoProduto: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.comentarioAvaliacao.findUnique({
      where: { id },
      include: {
        usuario: true,
        avaliacaoLoja: true,
        avaliacaoProduto: true,
      },
    });
  }

  update(id: number, dto: UpdateComentarioDto) {
    return this.prisma.comentarioAvaliacao.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.comentarioAvaliacao.delete({
      where: { id },
    });
  }
}
