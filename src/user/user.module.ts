// src/user/user.module.ts

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// Caminho corrigido: sobe um nível (para 'src/') e entra em 'prisma/'
import { PrismaService } from '../prisma.service'; 

@Module({
  // 1. O Controller é sempre colocado aqui
  controllers: [UserController],
  
  // 2. Os Services (providers) que o módulo usa ou injeta
  providers: [
    UserService, 
    PrismaService, // O UserService precisa do PrismaService
  ],
  
  // 3. Opcional: Se outros módulos (como o AppModule) precisarem usar o UserService, você o exporta.
  // exports: [UserService], 
})
export class UserModule {}