import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module'; 
import { ProdutoModule } from '../produto/produto.module';
import { PrismaModule } from './prisma/prisma.module';
import { AvaliacaoLojaModule } from './avaliacao/avaliacao-loja.module';
import { AvaliacaoProdutoModule } from './avaliacao/avaliacao-produto.module';
import { ComentarioModule } from './comentario/comentario.module';

@Module({
  imports: [
    UserModule, 
    ProdutoModule, 
    PrismaModule,
    AvaliacaoLojaModule,
    AvaliacaoProdutoModule,
    ComentarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}