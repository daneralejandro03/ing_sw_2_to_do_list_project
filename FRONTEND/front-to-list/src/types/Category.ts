export class Category{
    id?: number;
    name: string;
    description: string;

    constructor(name: string, description: string, id?: number){
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static fromJson(data: Category): Category {
        return new Category(
            data.name,
            data.description,
            data.id
        );
    }

    static toJson(category: Category): Category {
        return new Category( 
            category.name,
            category.description,
            category.id
        );
    }
}