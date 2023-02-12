import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.reducer';
import * as orderReducers from '../store/order.reducer';

export const selectOrderState = createFeatureSelector<OrderState>('orders')

export const selectAllOrders = createSelector(
		selectOrderState,
		orderReducers.selectAll
);

export const  seelectEntities = createSelector(
	selectOrderState,
	orderReducers.selectEntities
);

export const selectIds = createSelector(
	selectOrderState,
	orderReducers.selectIds
);

export const selectTotalCount = createSelector(
	selectOrderState,
	orderReducers.selectTotal
);

export const selectOrderById = (id: number) => 
	createSelector(
		selectAllOrders,
		(orders) => orders[id]
	);
