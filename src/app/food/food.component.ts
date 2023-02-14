import { AfterContentInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderState } from './store/order.reducer';
import { FoodService } from './service/food.service';
import { Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from '../shared/models/Order';
import * as orderActions from './store/order.actions';
import * as orderSelectors from './store/order.selectors';


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
	orders$: Observable<Order[]> = new Observable();
	orderId?: Number;

	constructor(
		private store: Store<OrderState>,
		private foodService: FoodService,
		private route: Router,
		private router: ActivatedRoute
	) {
		this.router.paramMap.subscribe( params => this.orderId = Number(params.get('id')))
	}

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
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			address: '',
			zip: '',
			foodOrder: [...this.foodOrder],
		}
		this.store.dispatch(orderActions.addOrder({order: this.order}))
		this.route.navigate(['/food-order'])
		this.order = undefined;
	}

}
