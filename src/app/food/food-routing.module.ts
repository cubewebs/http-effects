import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodComponent } from './food.component';
import { FoodOrderComponent } from './food-order/food-order.component';
import { OrdersResolver } from './order.resolver';
import { OrderListComponent } from './order-list/order-list.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
	{
		path: '',
		resolve: { orders: OrdersResolver},
		children: [
			{ path: 'food/:id', component: FoodComponent },
			{ path: 'food-order', component: FoodOrderComponent },
			{ path: 'order-list', component: OrderListComponent },
			{ path: 'thankyou', component: ThankyouComponent },
			{ path: '', redirectTo: 'order-list', pathMatch: 'full' },
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OrdersResolver]
})
export class FoodRoutingModule { }
