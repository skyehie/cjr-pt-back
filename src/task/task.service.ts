import { Get, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class TaskService {
  constructor (private prisma: PrismaService){}
  async create(data: CreateTaskDto) {
    const task = this.prisma.imagemProduto.create({
      data
    });
    return task;
  }

  async findAll(){
    return this.prisma.imagemProduto.findMany();
  }
  
  async update(id: number, data: CreateTaskDto){
    const taskexists = await this.prisma.imagemProduto.findUnique({
      where: {id}
    });
    if(!taskexists){
      throw new Error("Tarefa não encontrada");
    }
    return await this.prisma.imagemProduto.update({
      data,
      where: {id}
    });
  }

  async delete(id: number){
    const taskexists = await this.prisma.imagemProduto.findUnique({
      where: {id}
    });
    if(!taskexists){
      throw new Error("Tarefa não encontrada");
    }
    return await this.prisma.imagemProduto.delete({
      where: {id}
    });
  }

  async findOne(id: number){
    const taskexists = await this.prisma.imagemProduto.findUnique({
      where: {id}
    });
    if(!taskexists){
      throw new Error("Tarefa não encontrada");
    }
    return taskexists;
  }

}