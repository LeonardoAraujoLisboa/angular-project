import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list/shopping-list-edit/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.css',
})
export class ShoppingComponent implements OnInit, OnDestroy {
  newIngredient: Ingredients[] = [];
  private shoppingListSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.newIngredient = this.shoppingListService.getIngredients();
    this.shoppingListSub = this.shoppingListService.newIngredient.subscribe(
      (ingredient: Ingredients[]) => {
        this.newIngredient = ingredient;
      }
    );
  }

  ngOnDestroy(): void {
    this.shoppingListSub.unsubscribe();
  }
}
