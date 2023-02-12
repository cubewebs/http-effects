import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as orderActions from '../store/order.actions';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { FoodService } from '../service/food.service';
import { of } from 'rxjs';


@Injectable()
export class OrderEffects {

	loadOrders$ = createEffect(
		() => this.actions$.pipe(
			ofType(orderActions.loadOrders),
			concatMap(
				() => this.fs.getAllOrders().pipe(
					map( orders => orderActions.loadOrdersSuccess({ orders })),
					catchError( error => of(orderActions.loadOrdersFailure({ error })))
				)
			)
		)
	);

	addOrder$ = createEffect(
		() => this.actions$.pipe(
			ofType(orderActions.addOrder),
			concatMap(
				action => this.fs.addOrder(action.order).pipe(
					map( order => orderActions.addOrderSuccess({ order })),
					catchError( error => of(orderActions.addOrderFailure({ error })))
				)
			)
		)
	);


  constructor(
	private actions$: Actions,
	private fs: FoodService
	) {}


}
