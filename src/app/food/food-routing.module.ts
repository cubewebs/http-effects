import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodComponent } from './food.component';
import { FoodOrderComponent } from './food-order/food-order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: 'food-order/:id', component: FoodOrderComponent },
			{ path: 'food-order', component: FoodOrderComponent },
			{ path: 'order-list', component: OrderListComponent },
			{ path: 'food/:id', component: FoodComponent },
			{ path: 'thankyou', component: ThankyouComponent },
			{ path: '', redirectTo: 'order-list', pathMatch: 'full' },
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FoodRoutingModule { }
