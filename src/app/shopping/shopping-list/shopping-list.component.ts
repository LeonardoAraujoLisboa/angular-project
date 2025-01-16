import { Component, Input, OnInit } from '@angular/core';
import { Ingredients } from '../../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list-edit/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  @Input('ingredients') ingredients: Ingredients[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
