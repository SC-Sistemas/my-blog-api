import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

//El nombre de la clase debe estar asociado a la accion que va tener
export class CreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
//Inidicarle a nest de manera global que todo este con un DTO
//Validalo en la capa del controlador
export class UpdateDTO {
  @IsString()
  @IsOptional() //Hace opcional
  name: string;

  @IsEmail()
  @IsOptional() //Hace opcional
  email: string;
}
