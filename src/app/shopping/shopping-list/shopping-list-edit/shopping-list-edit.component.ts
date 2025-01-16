import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredients } from '../../../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css',
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') singupForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredients;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.singupForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const amount = form.value.amount;

    if (this.editMode) {
      const newIngredient = new Ingredients(name, amount);

      this.shoppingListService.onUpdateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      const newIngredient = new Ingredients(name, amount);

      this.shoppingListService.onAddIngredient(newIngredient);
    }

    form.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteItem() {
    this.shoppingListService.onDeleteIngredient(this.editedItemIndex);

    this.singupForm.reset();

    this.editMode = false;
  }

  onClear() {
    this.shoppingListService.onClearIngredients();

    this.editMode = false;
  }
}
