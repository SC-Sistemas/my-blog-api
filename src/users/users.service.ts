import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDTO, UpdateDTO } from './user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entetiy';

@Injectable() //Puede ser reusado por diferentes controladores
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.findOne(id);
    if (user.id === 1) {
      throw new ForbiddenException('You are not allowed to access this user');
    }
    return user;
  }

  async create(body: CreateDTO) {
    const newUser = await this.usersRepository.save(body); //Save si guarda en la base de datos
    return newUser;
  }

  //Actualizar
  async update(id: number, changes: UpdateDTO) {
    const user = await this.findOne(id);
    const updateUser = this.usersRepository.merge(user, changes);
    return this.usersRepository.save(updateUser);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id);
    return { message: 'User Deleted' };
  }

  //No va hacer expuesto
  private async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    // Busca dentro del arreglo un usuario que tenga ese id
    return user;
  }
}
