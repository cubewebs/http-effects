import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from './food.component';
import { FoodOrderComponent } from './food-order/food-order.component';
import { StoreModule } from '@ngrx/store';
import * as fromOrder from './store/order.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './store/order.effects';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FoodComponent, FoodOrderComponent],
  imports: [
    CommonModule,
    FoodRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(fromOrder.ordersFeatureKey, fromOrder.reducer),
    EffectsModule.forFeature([OrderEffects]),
	ReactiveFormsModule
  ],
})
export class FoodModule {}
