import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFood from './food.reducer';

export const selectFoodState = createFeatureSelector<fromFood.State>(
  fromFood.foodFeatureKey
);
