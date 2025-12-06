import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProdutoDto {
@IsNumber()
@IsOptional()
  loja_id?: number;

@IsNumber()
@IsOptional()
  categoria_id?: number;

@IsString()
@IsOptional()
  nome?: string;

@IsString()
@IsOptional()
  descricao?: string;

@IsString()
@IsOptional()
  preco?: string;

@IsNumber()
@IsOptional()
  estoque?: number;
}
