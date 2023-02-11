import { AfterContentInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderState } from './store/order.reducer';
import { FoodService } from './service/food.service';
import { Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { Router } from '@angular/router';
import { Order } from '../shared/models/Order';
import * as orderActions from './store/order.actions';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements AfterContentInit {

	food$: Observable<Food[]> = new Observable<Food[]>();
	quantity: number = 0;
	foodOrder: Food[] = [];
	order?: Order;

	constructor(
		private store: Store<OrderState>,
		private foodService: FoodService,
		private route: Router
	) {}

	ngAfterContentInit(): void {
		this.loadFoodList();
	}

	loadFoodList() {
		this.food$ = this.foodService.getFoodList()
	}

	addOne(added: Food) {
		if(this.foodOrder.indexOf(added) === -1) {
			added.quantity += 1;
			this.foodOrder.push(added)
		} else {
			const addedId = added.id;
			this.foodOrder.find( food => food.id === addedId )!.quantity += 1;
		}
	}

	continueOrder() {
		this.order = {
			id: 0,
			userId: 0, 
			address: '',
			orderName: '',
			phoneNumber: '',
			foodOrder: [...this.foodOrder],
		}
		console.log('this.foodOrder ->', this.foodOrder)
		console.log('this.order ->', this.order)
		this.store.dispatch(orderActions.addOrder({order: this.order}))
		this.route.navigate(['/food-order'])
		this.order = undefined;
	}

}
