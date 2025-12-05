import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDto {
  nome!: string;
  usuario!: string;
  senha!: string;
  confirmacaoSenha!: string;
  @IsEmail() 
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  senha_hash!: string;

  @IsString()
  @IsNotEmpty()
  foto_perfil_url!: string;
}
