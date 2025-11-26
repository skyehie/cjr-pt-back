import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos') // 👈 rota base
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  // 🟢 CREATE
  @Post()
  async create(@Body() data: CreateProdutoDto) {
    data.preco = data.preco?.toString();
    return this.produtoService.create(data);
  }

  // 🔵 READ - todos
  @Get()
  async findAll() {
    return this.produtoService.findAll();
  }

  // 🟣 READ - por id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.produtoService.findOne(Number(id));
  }

  // 🟠 UPDATE
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateProdutoDto) {
    data.preco = data.preco?.toString();
    return this.produtoService.update(Number(id), data);
  }

  // 🔴 DELETE
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.produtoService.remove(Number(id));
  }
}
