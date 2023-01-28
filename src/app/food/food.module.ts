import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromFood from './ngrx/food.reducer';
import { FoodEffects } from './ngrx/food.effects';

import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from './food.component';
import { FoodOrderComponent } from './food-order/food-order.component';


@NgModule({
  declarations: [
	FoodComponent,
    FoodOrderComponent,
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
	HttpClientModule,
    StoreModule.forFeature(fromFood.foodFeatureKey, fromFood.reducer),
    EffectsModule.forFeature([FoodEffects])
  ]
})
export class FoodModule { }
