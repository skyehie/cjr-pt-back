import { IsNumber, IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  @IsInt() 
  @IsNotEmpty()
  produto_id!: number;

  @IsString()
  @IsNotEmpty()
  url_imagem!: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  ordem!: number;
}