import { Injectable } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class LojaService {
  constructor(private prisma: PrismaService) {}

  async create(createLojaDto: CreateLojaDto) {
    return await this.prisma.loja.create({
      data: {
        nome: createLojaDto.nome,
        categoria: createLojaDto.categoria,
        descricao: '',
        foto_perfil_url: createLojaDto.fotoPerfilUrl,
        logo_url: createLojaDto.logoUrl,
        banner_url: createLojaDto.bannerUrl,
        usuario_id: createLojaDto.usuarioId,
      },
    });
  }

  async findAll() {
    return await this.prisma.loja.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.loja.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateLojaDto: UpdateLojaDto) {
    return await this.prisma.loja.update({
      where: { id },
      data: { ...updateLojaDto },
    });
  }

  async remove(id: number) {
       return await this.prisma.loja.delete({
      where: { id },
    });
  }
}