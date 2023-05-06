import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Order } from '../../shared/models/Order';
import * as OrderActions from './order.actions';

export const ordersFeatureKey = 'orders';

export interface OrderState extends EntityState<Order> {
  // additional entities state properties
  error: any,
  selectedOrderId: number | null,
  allOrdersLoaded: boolean,
  currentOrder: Order | null,
  orders: Order[],
  searching: boolean
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: OrderState = adapter.getInitialState({
  // additional entity state properties
  error: null,
  selectedOrderId: null,
  allOrdersLoaded: false,
  currentOrder: null,
  orders: [],
  searching: false
});

export const reducer = createReducer(
  initialState,

  on(OrderActions.loadOrdersSuccess, (state, action) =>
    adapter.setAll(action.orders, {...state, allOrdersLoaded: true})
  ),
  on(OrderActions.loadOrdersFailure, (state, action) =>
  {return {...state, error: action.error, allOrdersLoaded: false}}
  ),
  on(OrderActions.loadOrderSuccess, (state, action) =>
    adapter.setOne(action.selectedOrder, {...state, currentOrder: action.selectedOrder, selectedOrderId: action.selectedOrder.id})
  ),
  on(OrderActions.loadOrderFailure, (state, action) =>
  {return {...state, error: action.error}}
  ),
  on(OrderActions.addOrderSuccess, (state, action) =>
    adapter.addOne(action.order, {...state, currentOrder: action.order, selectedOrderId: action.order.id})
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
  	adapter.updateOne(action.update, state)
  ),
  on(OrderActions.updateOrderFailure, (state, action) =>
  	{return {...state, error: action.error}}
  ),
  on(OrderActions.updateOrders, (state, action) =>
    adapter.updateMany(action.orders, state)
  ),
  on(OrderActions.deleteOrderSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(OrderActions.deleteOrderFailure, (state, action) =>
  	{return {...state, error: action.error}}
  ),
  on(OrderActions.deleteOrders, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(OrderActions.searchOrders, (state, action) => {
    return { ...state, searching: action.searching }
  }),
  on(OrderActions.searchOrdersSuccess, (state, action) => {
    return { ...state, orders: action.orders }
  }),
  on(OrderActions.searchOrdersFailure, (state, action) =>
  {return {...state, error: action.error}}
),
  on(OrderActions.clearOrders, (state) => adapter.removeAll(state)),
);

export const getSelectedOrderId = (state: OrderState) => state.selectedOrderId;

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

  // select the array of order ids
  export const selectOrderIds = selectIds;

  // select the dictionary of order entities
  export const selectOrderEntities = selectEntities;
