import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createcategory(@Body() newCategory: CreateCategoryDto) {
    return this.categoryService.createCategory(newCategory);
  }

  @Get()
  getcategorys(): Promise<Category[]> {
    return this.categoryService.getCategorys();
  }

  @Get(':id')
  getcategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategory(id);
  }

  @Delete(':id')
  deletecategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @Put(':id')
  updatecategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() category: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, category);
  }
}
