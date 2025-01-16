import { Ingredients } from '../../../shared/models/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  private ingredients: Ingredients[] = [new Ingredients('', 0)];
  newIngredient = new Subject<Ingredients[]>();
  startedEditing = new Subject<number>(); //é tipo um emitter e ai vc emite colocando o .next

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  onAddIngredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);

    this.newIngredient.next(this.ingredients);
  }

  onAddIngredients(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);

    this.newIngredient.next(this.ingredients);
  }

  onUpdateIngredient(index: number, newIngredient: Ingredients) {
    this.ingredients[index] = newIngredient;

    this.newIngredient.next(this.ingredients);
  }

  onDeleteIngredient(index: number) {
    this.ingredients.splice(index, 1);

    this.newIngredient.next(this.ingredients);
  }

  onClearIngredients() {
    this.ingredients = [];

    this.newIngredient.next(this.ingredients);
  }
}
