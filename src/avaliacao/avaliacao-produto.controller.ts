import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AvaliacaoProdutoService } from './avaliacao-produto.service';
import { CreateAvaliacaoProdutoDto } from '../dto/create-avaliacao-produto.dto';
import { UpdateAvaliacaoProdutoDto } from '../dto/update-avaliacao-produto.dto';

@Controller('avaliacao-produto')
export class AvaliacaoProdutoController {
  constructor(private readonly service: AvaliacaoProdutoService) {}

  @Post()
  create(@Body() dto: CreateAvaliacaoProdutoDto) {
    return this.service.create(dto);
  }

  @Get('produto/:id')
  findByProduto(@Param('id') id: string) {
    return this.service.findByProduto(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id/:userId')
  update(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() dto: UpdateAvaliacaoProdutoDto,
  ) {
    return this.service.update(Number(id), Number(userId), dto);
  }

  @Delete(':id/:userId')
  remove(@Param('id') id: string, @Param('userId') userId: string) {
    return this.service.remove(Number(id), Number(userId));
  }
}
