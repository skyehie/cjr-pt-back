import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import type { CreateTaskDto } from './dto/create-task.dto';
import { taskdto } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() data: CreateTaskDto) {
    return this.taskService.create(data);
  }
  @Get()
  async findAll(){
    return this.taskService.findAll();
  }
  @Put(':id')
  async update(@Param('id') id: Number, @Body() data: CreateTaskDto){
    return this.taskService.update(Number(id), data);
  }
  @Delete(':id')
  async delete(@Param('id') id: number){
    return this.taskService.delete(Number(id));
  }
  @Get(':id')
  async findOne(@Param('id') id: number){
    return this.taskService.findOne(Number(id));
  }
}
