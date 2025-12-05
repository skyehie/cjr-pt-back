import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDto {
  nome!: string;
  usuario!: string;
  email!: string;
  senha!: string;
  senha_hash!: string;
  confirmacaoSenha!: string;
<<<<<<< HEAD
  @IsEmail() 
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  senha_hash!: string;

  @IsString()
  @IsNotEmpty()
=======
>>>>>>> a901ea1b4253851ccddb700efd552276bd105ebd
  foto_perfil_url!: string;
}
