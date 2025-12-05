// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email }, 
    });

    if (!user) {
      throw new UnauthorizedException('E-mail não encontrado.');
    }

    const isMatch = await bcrypt.compare(pass, user.senha_hash);

    if (isMatch) {
    
      const { senha_hash, ...result } = user;
      return result;
    }
    
    throw new UnauthorizedException('Senha incorreta.');
  }


  async login(user: any) {

    const payload = { email: user.email, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    };
  }

  async updatePasswordParaHash(id: number, senhaPura: string) {
    const hash = await bcrypt.hash(senhaPura, 10);
    return this.prisma.user.update({
      where: { id },
      data: { senha_hash: hash } 
    });
  }
}