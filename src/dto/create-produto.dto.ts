import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProdutoDto {
  @IsNumber()
  @IsNotEmpty()
  loja_id!: number;

  @IsNumber()
  @IsNotEmpty()
  categoria_id!: number;

  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  descricao!: string;

  @IsString()
  @IsNotEmpty()
  preco!: string;

  @IsNumber()
  @IsNotEmpty()
  estoque!: number;
}
