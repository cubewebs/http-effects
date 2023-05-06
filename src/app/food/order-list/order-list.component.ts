import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/Order';
import { FoodService } from '../service/food.service';
import { OrderState } from '../store/order.reducer';
import * as orderSelectors from '../store/order.selectors';
import * as orderActions from '../store/order.actions';
import { Router } from '@angular/router';
import { loadOrder } from '../store/order.actions';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

	orders$?: Observable<Order[]>;
	ordersFound$?: Observable<Order[]>;
	searching: boolean = false;

	constructor(
		private store: Store<OrderState>,
		private route: Router
	) {}

	ngOnInit(): void {
		this.loadOrders();
	}

	loadOrders() {

		this.store.select(orderSelectors.selectSearching).subscribe( searching => {
			if(searching) {
				this.searching = searching;
				this.ordersFound$ = this.store.select(orderSelectors.selectOrdersFound)
			} else {
				this.searching = false;
				this.store.dispatch(orderActions.loadOrders());
				this.orders$ = this.store.select(orderSelectors.selectAllOrders)
			}
		})

	}

	editOrder(id: number) {
		this.route.navigate([`/food-order/${id}`])
	}

	deleteOrder(id: number) {

		if(confirm('Are you sure you want to delete this order?')) {
			this.store.dispatch(orderActions.deleteOrder({id}))
			this.loadOrders();
			this.ngOnInit();
		} else { return; }

	}

}
