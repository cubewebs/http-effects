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
import { Update } from '@ngrx/entity';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements AfterContentInit {

	food$: Observable<Food[]> = new Observable<Food[]>();
	quantity: number = 0;
	foodOrder: Food[] = [];
	selectedOrder: Order | undefined;
	order?: Update<Order>;
	orders$: Observable<Order[]> = new Observable();
	orderId!: number;

	constructor(
		private store: Store<OrderState>,
		private foodService: FoodService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.route.paramMap.subscribe( params => this.orderId = Number(params.get('id')));
		
	}

	ngAfterContentInit(): void {
		this.loadFoodList();
		console.log('this.orderId ->', this.orderId);
		this.store.select(orderSelectors.selectOrderById(this.orderId))
			.subscribe((order) => {
				this.selectedOrder = order;
				console.info('selected-order ->', this.selectedOrder)
			})
		}
		
		loadFoodList() {
			this.store.dispatch(orderActions.loadOrders());
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
			console.log('this.foodOrder ->', this.foodOrder)
		}

	continueOrder() {
		const order: Order = {
			...this.selectedOrder!,
			foodOrder: this.foodOrder
		}

		const update: Update<Order> = {
			id: order.id,
			changes: order
		}
		console.log('update ->', update)
		this.store.dispatch(orderActions.updateOrder({ update }));
		this.router.navigate(['/thankyou'])

		// if(this.orderId > 0) {
		// 	const tempOrder: Order = {
		// 		...this.selectedOrder,
		// 	};
	
		// 	const update: Update<Order> = {
		// 		id: order.id,
		// 		changes: order
		// 	}
		// 	this.store.dispatch(updateOrder({update}))
		// 	this.route.navigate([`/food/${update.id}`])
		// } else if(this.orderId === 0) {
		// 	this.store.dispatch(addOrder({ order: this.orderFormData.value }))
		// 	this.route.navigate([`/food/${this.selectedOrderId}`])
		// 	this.orderFormData.reset();
		// }		this.route.navigate(['/thankyou'])
	}

}
