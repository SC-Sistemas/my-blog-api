import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll() {
    return await this.postsRepository.find();
  }

  // Servicio para manejar posts
  async findOne(id: number) {
    // Busca un post en la base de datos con el id recibido
    const post = await this.postsRepository.findOne({
      where: { id }, // Busca por id en la tabla posts

      // "relations" indica a TypeORM que también cargue las relaciones.
      // - 'user' es la relación ManyToOne declarada en la entidad Post
      // - 'profile' es una relación dentro de User
      // Esto internamente hace un JOIN en SQL (posts -> users -> profiles).
      // El resultado incluye el post, el usuario al que pertenece y su perfil.
      relations: ['user.profile', 'categories'],
    });

    // Si no encuentra ningún post con ese id, lanza un error 404 (Not Found)
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    // Devuelve el post con sus relaciones (user y profile incluidos)
    return post;
  }

  async create(body: CreatePostDto) {
    try {
      // Creamos el nuevo post y asociamos el usuario y las categorías
      // 'user' se asocia por su id (debe existir en la base de datos)
      // 'categories' se asocian por sus ids (deben existir en la base de datos)
      // categoryIds es un array de números que representa los ids de las categorías
      // TypeORM solo necesita los ids para crear la relación en la tabla intermedia
      const newPost = await this.postsRepository.save({
        ...body, // Datos del post (title, content, etc.)
        user: { id: body.userId }, // Relación ManyToOne con usuario
        categories: body.categoryIds?.map((id) => ({ id })), // Relación ManyToMany con categorías
      });

      // Retornamos el post recién creado con sus relaciones cargadas
      return this.findOne(newPost.id);
    } catch {
      // Si ocurre un error (por ejemplo, ids inválidos), lanzamos un error 400
      throw new BadRequestException('Error creating post');
    }
  }

  async update(id: number, changes: UpdatePostDto) {
    try {
      const post = await this.findOne(id);
      const updatedPost = this.postsRepository.merge(post, changes);
      return await this.postsRepository.save(updatedPost);
    } catch {
      throw new BadRequestException('Error updating post');
    }
  }

  async delete(id: number) {
    const post = await this.findOne(id);
    await this.postsRepository.delete(post.id);
    return { message: 'Post Deleted' };
  }
}
