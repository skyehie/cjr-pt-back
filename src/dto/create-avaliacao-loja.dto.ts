import { IsInt, IsString, Min, Max } from 'class-validator';

export class CreateAvaliacaoLojaDto {
  @IsInt()
  usuario_id!: number;

  @IsInt()
  loja_id!: number;

  @IsInt()
  @Min(1)
  @Max(5)
  nota!: number;

  @IsString()
  comentario!: string;
}
