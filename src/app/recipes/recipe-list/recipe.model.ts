import { Ingredient } from 'src/app/shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name, desc, imagepath, ingredients) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagepath;
        this.ingredients = ingredients;
    }
}