import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDto } from './dtos/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entetiy';

@Injectable() //Puede ser reusado por diferentes controladores
export class UsersService {
  constructor(
    @InjectRepository(User) //Inyecta el repositorio de typeOrme asociado a la entidad user (user.entity.ts)
    private usersRepository: Repository<User>, //Es la forma en la interactuas con la base de datos usando el repository patter
  ) {}

  async findAll() {
    const users = await this.usersRepository.find(); //Fin es el metodo que busca los suarios
    return users;
  }

  async getUserById(id: number) {
    const user = await this.findOne(id); //
    if (user.id === 1) {
      //Aqui estamos negando el acceso al usuario 1
      throw new ForbiddenException('You are not allowed to access this user');
    }
    return user;
  }

  async create(body: CreateUserDTO) {
    // Crear usuario
    try {
      const newUser = await this.usersRepository.save(body); //Save si guarda en la base de datos
      return newUser;
    } catch {
      throw new BadRequestException('Error creating user'); //Manejador de errores lanzado Mensaje
    }
  }

  //Actualizar
  async update(id: number, changes: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      const updateUser = this.usersRepository.merge(user, changes);
      const savedUser = await this.usersRepository.save(updateUser); //Merge combina los cambios con el usuario existente
      return savedUser;
    } catch {
      throw new BadRequestException('Error uptading user');
    } //Save guarda el usuari}o
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id);
    return { message: 'User Deleted' };
  }

  //No va hacer expuesto
  // Es para buscar un usuario
  private async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    // Busca dentro del arreglo un usuario que tenga ese id
    return user;
  }

  //Obtener Perfil
  async getProfileByUserID(id: number) {
    const user = await this.findOne(id);
    return user.profile;
  }
}
