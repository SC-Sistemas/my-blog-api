import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsObject,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

//El nombre de la clase debe estar asociado a la accion que va tener
//Inidicarle a nest de manera global que todo este con un DTO
//Validalo en la capa del controlador
export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ValidateNested()
  @Type(() => CreateProfileDto) //Si utilizamos el type, agregamos en main.ts que utilizaremos un transforme y lo dejaremos en true
  @IsObject()
  @IsNotEmpty()
  profile: CreateProfileDto;
}
//Actualizar Usuario con Mapped Types
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDTO, ['profile']),
) {
  // Este sera
  @ValidateNested()
  @Type(() => UpdateProfileDto) //Si utilizamos el type, agregamos en main.ts que utilizaremos un transforme y lo dejaremos en true
  @IsOptional()
  profile: UpdateProfileDto;
}
