import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  //Agregar categoria
  //Es un array, tiene que ser opcional
  //Es un array de numeros, pero debemos verificar que seran numeros todos los contenido
  // each:true verifica que sean numeros
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds?: number[];
}
