import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as orderSelectors from './food/store/order.selectors';
import { Order } from './shared/models/Order';
import { loadOrders } from './food/store/order.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	orders: Order[] = [];

	constructor(
		private store: Store
	) {}

	ngOnInit(): void {
		this.store.dispatch(loadOrders())
		this.store.select(orderSelectors.selectAllOrders)
			.subscribe(
				orders => this.orders = orders
			)

		console.log('this.orders ->', this.orders)
	}
}
