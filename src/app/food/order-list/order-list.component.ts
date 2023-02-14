import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/Order';
import { FoodService } from '../service/food.service';
import { OrderState } from '../store/order.reducer';
import * as orderSelectors from '../store/order.selectors';
import * as orderActions from '../store/order.actions';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

	orders$?: Observable<Order[]>;

	constructor(
		private store: Store<OrderState>,
	) {
		this.loadOrders();
	}

	ngOnInit(): void {
		
	}

	loadOrders() {
		this.orders$ = this.store.select(orderSelectors.selectAllOrders)
	}

	deleteOrder(id: number) {
		if(confirm('Are you sure you want to delete this order?')) {
			this.store.dispatch(orderActions.deleteOrder({id}))
			this.loadOrders();
		} else { return; }
	}

}