import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Order } from '../../shared/models/Order';
import * as OrderActions from './order.actions';

export const ordersFeatureKey = 'orders';

export interface OrderState extends EntityState<Order> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
	selectId: order => order.id
});

export const initialState: OrderState = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,

  on(OrderActions.addOrderSuccess, (state, action) =>
    adapter.addOne(action.order, state)
  ),
  on(OrderActions.addOrderFailure, (state, action) =>
    {return {...state, error: action.error}}
  ),
  on(OrderActions.upsertOrder, (state, action) =>
    adapter.upsertOne(action.order, state)
  ),
  on(OrderActions.addOrders, (state, action) =>
    adapter.addMany(action.orders, state)
  ),
  on(OrderActions.upsertOrders, (state, action) =>
    adapter.upsertMany(action.orders, state)
  ),
  on(OrderActions.updateOrder, (state, action) =>
    adapter.updateOne(action.order, state)
  ),
  on(OrderActions.updateOrders, (state, action) =>
    adapter.updateMany(action.orders, state)
  ),
  on(OrderActions.deleteOrder, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(OrderActions.deleteOrders, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(OrderActions.loadOrders, (state, action) =>
    adapter.setAll(action.orders, state)
  ),
  on(OrderActions.clearOrders, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
