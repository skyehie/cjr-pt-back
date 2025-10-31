import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 
import { CreateUserDto } from '../dto/create-user.dto'; 
// 💡 CORREÇÃO 2: Voltando para a sintaxe de importação padrão. Isso deve resolver o erro TS2306
import { UpdateUserDto } from '../dto/update-user.dto'; 

@Injectable()
export class UserService {
  // O uso de 'readonly' é uma boa prática!
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    // Usando findUniqueOrThrow é uma alternativa mais limpa do Prisma
    // se você estiver usando uma versão recente (4.0+). Caso contrário, a sua lógica abaixo é perfeita.
    const user = await this.prisma.user.findUnique({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    await this.findOne(id); // garante que o usuário existe
    
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // garante que o usuário existe
    
    return this.prisma.user.delete({
      where: { id },
    });
  }
}