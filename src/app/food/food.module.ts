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
import { OrderListComponent } from './order-list/order-list.component';
import { MatIconModule } from '@angular/material/icon';
import { ThankyouComponent } from './thankyou/thankyou.component';


@NgModule({
  declarations: [FoodComponent, FoodOrderComponent, OrderListComponent, ThankyouComponent],
  imports: [
    CommonModule,
    FoodRoutingModule,
    HttpClientModule,
	MatIconModule,
    StoreModule.forFeature(fromOrder.ordersFeatureKey, fromOrder.reducer),
    EffectsModule.forFeature([OrderEffects]),
	ReactiveFormsModule
  ],
  providers: []
})
export class FoodModule {}
