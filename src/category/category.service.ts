import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Prisma } from '@prisma/client';
import { equal } from 'assert';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { nome, categoria_pai_id } = createCategoryDto;
    const data: Prisma.CategoriaCreateInput = {nome: nome,
    categoriaPai: categoria_pai_id
      ? { connect: { id: categoria_pai_id } }
      : undefined,
  };

    return this.prisma.categoria.create({ data: createCategoryDto as Prisma.CategoriaCreateInput });
  }

  async findAll() {
    return this.prisma.categoria.findMany({
      include: {
        categoriaPai: true,
        subcategorias: true,
      },
    });
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id: +id },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }
    return categoria;
  }

 async update(id: number, updateCategoryDto: UpdateCategoryDto) {
  try {
    return await this.prisma.categoria.update({
      where: { id: +id },
      data: updateCategoryDto,
    });
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const prismaError = error as { code: string };
      
      if (prismaError.code === 'P2025') {
        throw new NotFoundException(`Categoria com ID ${id} não encontrada para atualização`);
      }
    }
    throw error;
  }
}

async remove(id: number) {
  try {
    await this.prisma.categoria.delete({ 
      where: { id: +id }, 
    });
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const prismaError = error as { code: string };
      
      if (prismaError.code === 'P2025') { 
        throw new NotFoundException(`Categoria com ID ${id} não encontrada para remoção`);
      }
    }
    throw error; 
  }
}
}
