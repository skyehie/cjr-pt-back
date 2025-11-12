// src/app.module.ts (Versão Limpa)

import { Module } from '@nestjs/common';
// O caminho abaixo assume que seu UserModule está em src/user/user.module.ts
import { UserModule } from './user/user.module'; 
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    UserModule,
    CategoryModule, // 💡 Importação do módulo de usuário
  ],
  controllers: [
    // Se você não tem AppController, deixe este array vazio
  ],
  providers: [
    // Se você não tem AppService, deixe este array vazio
  ],
})
export class AppModule {}