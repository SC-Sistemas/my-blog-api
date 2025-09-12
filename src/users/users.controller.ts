// Importamos los decoradores y utilidades principales de NestJS
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  //La injeccion del servicio de con el Injectable del Service, crea un patron singleton
  //Se crea una sola intancia, solo una fuente de informacion

  //Usamos el decorador de get, donde tenemos la funcion
  //Donde retorna la funcion que tenemos en el userService
  @Get()
  getUser() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Post()
  crearUserIDAuto(@Body() body: CreateUserDTO) {
    return this.usersService.create(body);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Put(':id') //Modificar el usuario - Retonar todo el usuario modificado
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateUserDto,
  ) {
    return this.usersService.update(id, changes);
  }

  @Get(':id/profile')
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getProfileByUserID(id);
  }
}
