import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, NotFoundException, } from '@nestjs/common'
import { ProdutoService } from '@produto/produto.service';
import { CreateProdutoDto } from '@/dto/create-produto.dto';
import { UpdateProdutoDto } from '@/dto/update-produto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async create(@Body() data: CreateProdutoDto) {
    return this.produtoService.create(data);
  }

  @Get()
  async findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) { 
    const produto = await this.produtoService.findOne(id);

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return produto;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() data: UpdateProdutoDto
  ) {
    try {
        return await this.produtoService.update(id, data);
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        }
        throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) { 
    try {
        return await this.produtoService.remove(id);
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new NotFoundException(`Produto com ID ${id} não encontrado para deleção.`);
        }
        throw error;
    }
  }
}