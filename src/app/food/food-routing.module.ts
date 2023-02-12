import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodComponent } from './food.component';
import { FoodOrderComponent } from './food-order/food-order.component';
import { OrdersResolver } from './order.resolver';

const routes: Routes = [
	{
		path: '',
		resolve: { orders: OrdersResolver},
		children: [
			{ path: 'food', component: FoodComponent },
			{ path: 'food-order', component: FoodOrderComponent },
			{ path: '', redirectTo: 'food', pathMatch: 'full' },
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OrdersResolver]
})
export class FoodRoutingModule { }
