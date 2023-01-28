import { Action, createReducer, on } from '@ngrx/store';
import * as FoodActions from './food.actions';

export const foodFeatureKey = 'food';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(FoodActions.createFoods, state => state),
  on(FoodActions.createFoodsSuccess, (state, action) => state),
  on(FoodActions.createFoodsFailure, (state, action) => state),

);
