import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ShareDataService {

  private drinkSource = new BehaviorSubject<Service>(null);
  private foodSource = new BehaviorSubject<Service>(null);
  drinkData = this.drinkSource.asObservable();
  foodData = this.foodSource.asObservable();

  constructor() { }

  AddDrink(drink: Service) {
    this.drinkSource.next(drink);
  }

  AddFood(food: Service) {
    this.foodSource.next(food);
  }
}