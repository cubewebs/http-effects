import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodComponent } from './food.component';
import { FoodOrderComponent } from './food-order/food-order.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: 'food', component: FoodComponent },
			{ path: 'food-order', component: FoodOrderComponent },
			{ path: '', redirectTo: 'food', pathMatch: 'full' },
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
