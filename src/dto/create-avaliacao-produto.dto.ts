import { IsInt, IsString, Min, Max } from 'class-validator';

export class CreateAvaliacaoProdutoDto {
  @IsInt()
  usuario_id!: number;

  @IsInt()
  produto_id!: number;

  @IsInt()
  @Min(1)
  @Max(5)
  nota!: number;

  @IsString()
  comentario!: string;
}
