import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePartnerDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional() // O nome pode ser opcional se não for atualizado
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional() // O telefone pode ser opcional se não for atualizado
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional() // O celular pode ser opcional se não for atualizado
  cellphone: string;
  
  @IsString()
  @IsNotEmpty()
  @IsOptional() // A categoria pode ser opcional se não for atualizada
  category: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional() // O gerente clínico pode ser opcional se não for atualizado
  clinicalManager: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional() // O responsável financeiro pode ser opcional se não for atualizado
  financialResponsible: string;
}
