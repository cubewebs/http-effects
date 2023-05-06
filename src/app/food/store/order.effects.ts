import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as orderActions from '../store/order.actions';
import { catchError, concatMap, debounceTime, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { FoodService } from '../service/food.service';
import { of, tap } from 'rxjs';
import { updateOrder } from './order.actions';
import { Router } from '@angular/router';


@Injectable()
export class OrderEffects {

	loadOrders$ = createEffect(
		() => this.actions$.pipe(
			ofType(orderActions.loadOrders),
			mergeMap(
				() => this.fs.getAllOrders().pipe(
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

	deleteOrder$ = createEffect(
		() => this.actions$.pipe(
			ofType(orderActions.deleteOrder),
			mergeMap(
				({id}) => this.fs.deleteOrder(id).pipe(
					map( ({id}) => orderActions.deleteOrderSuccess({ id })),
					catchError( error => of(orderActions.deleteOrderFailure({ error })))
				)
			)
		)
	);

	uptedeOrder$ = createEffect(
		() => this.actions$.pipe(
			ofType(orderActions.updateOrder),
			concatMap( action => this.fs.updateOrder(
				Number(action.update.id),
				action.update.changes,
			)),
			catchError(error => of(orderActions.updateOrderFailure({ error })))
		),
		{dispatch: false}
	);

	searchOrders$ = createEffect(
		() => this.actions$.pipe(
			ofType(orderActions.searchOrders),
			debounceTime(1000),
			exhaustMap(({query, searching}) => this.fs.searchOrders(query)),
			tap(res => console.log('res ->', res)),
			map((orders) => orderActions.searchOrdersSuccess({ orders })),
			catchError(error => of(orderActions.searchOrdersFailure({ error })))
		)
	)

	// redirectToThankyou$ = createEffect(
	// 	() => this.actions$.pipe(
	// 		ofType(orderActions.updateOrder),
	// 		tap((action) => {
	// 			this.router.navigate(['/thankyou'])
	// 		})
	// 	), { dispatch: false }
	// )

  constructor(
	private actions$: Actions,
	private fs: FoodService,
	private router: Router
	) {}


}
