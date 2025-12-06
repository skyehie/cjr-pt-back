import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateComentarioDto {
  @IsInt()
  usuario_id!: number;

  @IsString()
  comentario?: string;

  @IsOptional()
  @IsInt()
  avaliacao_loja_id?: number;

  @IsOptional()
  @IsInt()
  avaliacao_produto_id?: number;
}
