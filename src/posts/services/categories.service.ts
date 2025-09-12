import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async create(body: CreateCategoryDto) {
    try {
      const newCategory = this.categoriesRepository.create(body);
      return await this.categoriesRepository.save(newCategory);
    } catch {
      throw new BadRequestException('Error creating category');
    }
  }

  async update(id: number, changes: UpdateCategoryDto) {
    try {
      const category = await this.findOne(id);
      const updatedCategory = this.categoriesRepository.merge(
        category,
        changes,
      );
      return await this.categoriesRepository.save(updatedCategory);
    } catch {
      throw new BadRequestException('Error updating category');
    }
  }

  async delete(id: number) {
    const category = await this.findOne(id);
    await this.categoriesRepository.delete(category.id);
    return { message: 'Category Deleted' };
  }
}
