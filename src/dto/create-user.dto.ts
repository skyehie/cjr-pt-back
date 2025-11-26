export class CreateUserDto {
  nome!: string;
  usuario!: string;
  email!: string;
  senha!: string;
  senha_hash!: string;
  confirmacaoSenha!: string;
  foto_perfil_url!: string;
}
