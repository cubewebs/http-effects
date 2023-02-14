import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Order } from '../../shared/models/Order';

export const loadOrders = createAction(
  '[Order/API] Load Orders'
);

export const loadOrdersSuccess = createAction(
  '[Order/Effect] Load Orders Success', 
  props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
  '[Order/Effect] Load Orders Failure', 
  props<{ error: any }>()
);

export const loadOrder = createAction(
  '[Order/API] Load Order',
  props<{ id: number }>()
);

export const loadOrderSuccess = createAction(
  '[Order/Effect] Load Order Success', 
  props<{ selectedOrder: Order }>()
);

export const loadOrderFailure = createAction(
  '[Order/Effect] Load Order Failure', 
  props<{ error: any }>()
);

export const addOrder = createAction(
  '[Order/API] Add Order',
  props<{ order: Order }>()
);

export const addOrderSuccess = createAction(
  '[Order/Effect] Add Order Success',
  props<{ order: Order }>()
);

export const addOrderFailure = createAction(
  '[Order/Effect] Add Order Failure',
  props<{ error: any }>()
);

export const upsertOrder = createAction(
  '[Order/API] Upsert Order',
  props<{ order: Order }>()
);

export const addOrders = createAction(
  '[Order/API] Add Orders',
  props<{ orders: Order[] }>()
);

export const upsertOrders = createAction(
  '[Order/API] Upsert Orders',
  props<{ orders: Order[] }>()
);

export const updateOrder = createAction(
  '[Order/API] Update Order',
  props<{ order: Update<Order> }>()
);

export const updateOrders = createAction(
  '[Order/API] Update Orders',
  props<{ orders: Update<Order>[] }>()
);

export const deleteOrder = createAction(
  '[Order/API] Delete Order',
  props<{ id: number }>()
);

export const deleteOrderSuccess = createAction(
  '[Order/API] Delete Order Success',
  props<{ id: number }>()
);

export const deleteOrderFailure = createAction(
  '[Order/API] Delete Order Failure',
  props<{ error: any }>()
);

export const deleteOrders = createAction(
  '[Order/API] Delete Orders',
  props<{ ids: string[] }>()
);

export const clearOrders = createAction(
  '[Order/API] Clear Orders'
);
