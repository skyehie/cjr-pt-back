
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { LojaModule } from './loja/loja.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    TaskModule,
    LojaModule,
    AuthModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}