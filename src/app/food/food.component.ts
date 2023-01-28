import { AfterContentInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Food } from '../shared/models/food';
import { State } from './ngrx/food.reducer';
import { FoodService } from './service/food.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements AfterContentInit {

	food$: Observable<Food[]> = new Observable<Food[]>();

	constructor(
		private store: Store<State>,
		private foodService: FoodService
	) {}

	ngAfterContentInit(): void {
		this.loadFoodList();
	}

	loadFoodList() {
		this.food$ = this.foodService.getFoodList()
	}

}
