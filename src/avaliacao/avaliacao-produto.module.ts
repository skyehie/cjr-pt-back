import { Module } from '@nestjs/common';
import { AvaliacaoProdutoController } from './avaliacao-produto.controller';
import { AvaliacaoProdutoService } from './avaliacao-produto.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AvaliacaoProdutoController],
  providers: [AvaliacaoProdutoService, PrismaService],
  exports: [AvaliacaoProdutoService],
})
export class AvaliacaoProdutoModule {}
