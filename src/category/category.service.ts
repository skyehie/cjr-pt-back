import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { equal } from 'assert';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        categoriaPai: true,
        subcategorias: true,
      },
    });
  }

  async findOne(id: number) {
    const categoria = await this.prisma.category.findUnique({
      where: { id: +id },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }
    return categoria;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id: +id },
        data: updateCategoryDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.categoria.delete({
        where: { id: +id },
      });
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'P2025') {
        throw new NotFoundException(`Categoria com ID ${id} não encontrada para remoção`);
      }
      throw error;
    }
  }
}
