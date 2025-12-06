import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AvaliacaoLojaService } from './avaliacao-loja.service';
import { CreateAvaliacaoLojaDto } from '../dto/create-avaliacao-loja.dto';
import { UpdateAvaliacaoLojaDto } from '../dto/update-avaliacao-loja.dto';

@Controller('avaliacao-loja')
export class AvaliacaoLojaController {
  constructor(private readonly service: AvaliacaoLojaService) {}

  @Post()
  create(@Body() dto: CreateAvaliacaoLojaDto) {
    return this.service.create(dto);
  }

  @Get('loja/:id')
  findByLoja(@Param('id') id: string) {
    return this.service.findByLoja(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id/:userId')
  update(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() dto: UpdateAvaliacaoLojaDto,
  ) {
    return this.service.update(Number(id), Number(userId), dto);
  }

  @Delete(':id/:userId')
  remove(@Param('id') id: string, @Param('userId') userId: string) {
    return this.service.remove(Number(id), Number(userId));
  }
}
