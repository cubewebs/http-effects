import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState, selectOrderEntities } from './order.reducer';
import * as orderReducers from '../store/order.reducer';
import { state } from '@angular/animations';

export const selectOrderState = createFeatureSelector<OrderState>('orders')

export const selectAllOrders = createSelector(
		selectOrderState,
		orderReducers.selectAll
);

export const selectOneOrder = createSelector(
		selectOrderState,
		(state: OrderState) => state.selectedOrderId
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
		(orders) => orders.find(o => o.id === id)
	);

export const areOrdersLoaded = createSelector(
	selectOrderState,
	state => state.allOrdersLoaded
);

export const selectCurrentOrderId = createSelector(
	selectOrderState,
	orderReducers.getSelectedOrderId
);

export const selectCurrentOrder = createSelector(
	selectOrderEntities,
	selectCurrentOrderId,
	(orderEntities, orderId) => orderId && orderEntities[orderId]
);

export const selectOrdersFound = createSelector(
	selectOrderState,
	state => state.orders
);

export const selectSearching = createSelector(
	selectOrderState,
	state => state.searching
);


