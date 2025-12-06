import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from ':prisma/prisma.service'; 
import { CreateUserDto } from '../dto/create-user.dto'; 
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '@prisma/client'; 

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User com ID ${id} não encontrado para atualização.`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User com ID ${id} não encontrado para deleção.`);
      }
      throw error;
    }
  }
}