import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

  @IsString()
  @IsOptional()
  nome?: string; 

  @IsInt()
  @IsOptional()
  categoria_pai_id?: number; 
}
