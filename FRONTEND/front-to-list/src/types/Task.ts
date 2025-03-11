import { Category } from "./Category";

export class Task{
    id?: number;
    title: string;
    description: string;
    completed: boolean;
    category?: Category;

    constructor(title: string, description: string, completed: boolean, category?: Category, id?: number){
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.category = category;
    }

    static fromJson(data: Task): Task{
        return new Task(
            data.title,
            data.description,
            data.completed,
            data.category ? Category.fromJson(data.category) : undefined,
            data.id
        )
    }

    static toJson(task: Task): Task{
        return new Task(
            task.title,
            task.description,
            task.completed,
            task.category ? Category.toJson(task.category) : undefined,
            task.id
        )
    }

}


