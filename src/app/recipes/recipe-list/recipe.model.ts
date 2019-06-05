export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(name, desc, imagepath) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagepath;
    }
}