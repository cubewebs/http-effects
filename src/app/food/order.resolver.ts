import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { finalize, first, Observable, tap } from 'rxjs';
import { Store } from "@ngrx/store";
import { loadOrders } from './store/order.actions';

@Injectable()
export class OrdersResolver implements Resolve<any> {

	loading: boolean = false;

	constructor(
		private store: Store
	) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this.store.pipe(
			tap(() => {
				if(!this.loading) {
					this.loading = true;
					this.store.dispatch(loadOrders());
				}
			}),
			first(),
			finalize(() => this.loading = false)
		);
	}

}