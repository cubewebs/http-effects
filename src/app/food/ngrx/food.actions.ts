import { createAction, props } from '@ngrx/store';

export const createFoods = createAction(
  '[Food] Create Foods'
);

export const createFoodsSuccess = createAction(
  '[Food] Create Foods Success',
  props<{ data: any }>()
);

export const createFoodsFailure = createAction(
  '[Food] Create Foods Failure',
  props<{ error: any }>()
);
