import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { filter, finalize, first, Observable, tap } from 'rxjs';
import { select, Store } from "@ngrx/store";
import { loadOrders } from './store/order.actions';
import { areOrdersLoaded } from './store/order.selectors';

@Injectable()
export class OrdersResolver implements Resolve<any> {

	loading: boolean = false;

	constructor(
		private store: Store
	) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this.store.pipe(
			select(areOrdersLoaded),
			tap((ordersLoaded) => {
				if(!this.loading && !ordersLoaded) {
					this.loading = true;
					this.store.dispatch(loadOrders());
				}
			}),
			filter(ordersLoaded => ordersLoaded),
			first(),
			finalize(() => this.loading = false)
		);
	}

}