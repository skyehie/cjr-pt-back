import { IsInt, IsOptional, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  
    @IsString()
    @IsNotEmpty()
    nome!: string;

  @IsInt()
  @IsOptional() 
  @Type(() => Number) 
  categoria_pai_id?: number; 
}