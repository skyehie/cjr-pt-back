import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateLojaDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  categoria!: string;

  @IsString()
  @IsOptional()
  fotoPerfilUrl?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsString()
  @IsOptional()
  bannerUrl?: string;

  
  @IsInt()
  @IsNotEmpty()
  usuarioId!: number;
}