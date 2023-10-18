import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class AddressDto {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
}

export class AddPartnerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  cellphone: string;

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  clinicalManager: string;

  @IsNotEmpty()
  @IsString()
  financialResponsible: string;

  @IsNotEmpty()
  @IsObject()
  address: AddressDto;
}
