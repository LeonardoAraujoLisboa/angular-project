import { Ingredients } from '../shared/models/ingredient.model';

export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredients[];

  constructor(
    id: number,
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredients[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
