export class CreateTaskDto {
  title: string;
  description: string;
  completed: boolean;
  categoryId?: number;
}
