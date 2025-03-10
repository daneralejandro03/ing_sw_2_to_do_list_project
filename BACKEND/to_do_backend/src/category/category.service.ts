import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(category: CreateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { name: category.name },
    });

    if (categoryFound) {
      throw new HttpException('La Categoria ya existe', HttpStatus.CONFLICT);
    }

    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  getCategorys() {
    return this.categoryRepository.find();
  }

  async getCategory(id: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!categoryFound) {
      return new HttpException('Categoria no encontrada', HttpStatus.NOT_FOUND);
    }

    return categoryFound;
  }

  async deleteCategory(id: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoryFound) {
      return new HttpException('Categoria no encontrada', HttpStatus.NOT_FOUND);
    }

    return this.categoryRepository.delete({ id });
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoryFound) {
      return new HttpException('Categoria no encontrada', HttpStatus.NOT_FOUND);
    }

    return this.categoryRepository.update({ id }, category);
  }
}
