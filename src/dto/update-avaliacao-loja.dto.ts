import { IsInt, IsString, Min, Max, IsOptional } from 'class-validator';

export class UpdateAvaliacaoLojaDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  nota?: number;

  @IsOptional()
  @IsString()
  comentario?: string;
}
