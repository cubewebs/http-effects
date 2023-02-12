import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as orderActions from '../store/order.actions';
import { catchError, concatMap, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { FoodService } from '../service/food.service';
import { of } from 'rxjs';


@Injectable()
export class OrderEffects {

	loadOrders$ = createEffect(
		() => this.actions$.pipe(
			ofType(orderActions.loadOrders),
			mergeMap(
				(action) => this.fs.getAllOrders().pipe(
					map( orders => orderActions.loadOrdersSuccess({ orders })),
					catchError( error => of(orderActions.loadOrdersFailure({ error })))
				)
			)
		)
	);

	loadOrder$ = createEffect(
		() => this.actions$.pipe(
			ofType(orderActions.loadOrder),
			mergeMap(
				(action) => this.fs.getOrderById(action.id).pipe(
					map( selectedOrder => orderActions.loadOrderSuccess({ selectedOrder })),
					catchError( error => of(orderActions.loadOrderFailure({ error })))
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
