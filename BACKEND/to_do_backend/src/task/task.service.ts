import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { HttpException } from '@nestjs/common';
import { Category } from 'src/category/category.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createTask(taskDto: CreateTaskDto) {
    const taskFound = await this.taskRepository.findOne({
      where: { title: taskDto.title },
    });
    if (taskFound) {
      throw new HttpException('La tarea ya existe', HttpStatus.CONFLICT);
    }
    let category: Category | null = null;
    if (taskDto.categoryId !== undefined && taskDto.categoryId !== null) {
      category = await this.categoryRepository.findOne({
        where: { id: taskDto.categoryId },
      });
      if (!category) {
        throw new HttpException(
          'Categoría no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const newTask = this.taskRepository.create({
      title: taskDto.title,
      description: taskDto.description,
      completed: taskDto.completed,
      category: category,
    });
    return this.taskRepository.save(newTask);
  }

  getTasks() {
    return this.taskRepository.find();
  }

  async getTask(id: number) {
    const taskFound = await this.taskRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!taskFound) {
      return new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
    }

    return taskFound;
  }

  async deleteTask(id: number) {
    const taskFound = await this.taskRepository.findOne({ where: { id } });

    if (!taskFound) {
      return new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
    }

    return this.taskRepository.delete({ id });
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const taskFound = await this.taskRepository.findOne({ where: { id } });
    if (!taskFound) {
      throw new HttpException('Tarea no encontrada', HttpStatus.NOT_FOUND);
    }

    const updateData: Partial<Task> = {};

    if (updateTaskDto.title !== undefined) {
      updateData.title = updateTaskDto.title;
    }
    if (updateTaskDto.description !== undefined) {
      updateData.description = updateTaskDto.description;
    }
    if (updateTaskDto.completed !== undefined) {
      updateData.completed = updateTaskDto.completed;
    }
    if (updateTaskDto.categoryId !== undefined) {
      if (updateTaskDto.categoryId === null) {
        updateData.category = null;
      } else {
        const category = await this.categoryRepository.findOne({
          where: { id: updateTaskDto.categoryId },
        });
        if (!category) {
          throw new HttpException(
            'Categoría no encontrada',
            HttpStatus.NOT_FOUND,
          );
        }
        updateData.category = category;
      }
    }

    if (Object.keys(updateData).length === 0) {
      throw new HttpException(
        'No se proporcionaron valores para actualizar',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.taskRepository.update({ id }, updateData);

    return await this.taskRepository.findOne({ where: { id } });
  }
}
