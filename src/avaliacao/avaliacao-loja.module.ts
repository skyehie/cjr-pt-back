import { Module } from '@nestjs/common';
import { AvaliacaoLojaController } from './avaliacao-loja.controller';
import { AvaliacaoLojaService } from './avaliacao-loja.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  controllers: [AvaliacaoLojaController],
  providers: [AvaliacaoLojaService, PrismaService],
  exports: [AvaliacaoLojaService],
})
export class AvaliacaoLojaModule {}
