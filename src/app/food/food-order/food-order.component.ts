import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Food } from 'src/app/shared/models/Food';
import { addOrder, loadOrder, updateOrder } from '../store/order.actions';
import { OrderState } from '../store/order.reducer';
import { FoodService } from '../service/food.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromOrderReducers from '../store/order.reducer';
import * as fromOrderSelectors from '../store/order.selectors';
import { Order } from '../../shared/models/Order';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-add-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.scss']
})
export class FoodOrderComponent implements OnInit {

  selectedFood: Food[] = [];
  selectedOrderId: number = 0;
  selectedOrder: Order | undefined;
	
  orderFormData: FormGroup = this.fb.group({

    id: [],
    userId: [], 
    firstName: [ , [Validators.required]],
    lastName: [ , [Validators.required]],
    email: [ , [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    phoneNumber: [ , [Validators.required]],
    address: [ , [Validators.required]],
    zip: [ , [Validators.required]],
    privacy: ['true'],
    foodOrder: [],

  })

  constructor(
    private fb: FormBuilder,
    private store: Store<OrderState>,
	private route: Router,
	private router: ActivatedRoute
  ) {
	this.router.paramMap.subscribe( params => this.selectedOrderId = Number(params.get('id')))
	console.log('this.selectedOrderId ->', this.selectedOrderId)
	if(this.selectedOrderId !== 0) {
		this.store.dispatch(loadOrder({id: this.selectedOrderId}))
		setTimeout(() => {
			this.store.select(fromOrderSelectors.selectOrderById(this.selectedOrderId))
			.subscribe((order) => {
				this.orderFormData.reset(order);
				console.log('order ->', order)
			})
		}, 100);
	}
  }

  ngOnInit(): void {

  }

  get orderFood() {
    return this.orderFormData.controls['foodOrder'] as FormControl;
  }

  get orderId() {
    return this.orderFormData.controls['id'].value;
  }

  saveOrder() {

	console.log('this.selectedOrderId ->', this.selectedOrderId)

	if(this.orderFormData.invalid) { return }

	if(this.selectedOrderId > 0) {
		const order: Order = {
			...this.selectedOrder,
			...this.orderFormData.value
		};

		const update: Update<Order> = {
			id: order.id,
			changes: order
		}
		this.store.dispatch(updateOrder({update}))
		this.route.navigate([`/food/${update.id}`])
	} else if(this.selectedOrderId === 0) {
		this.store.dispatch(addOrder({ order: this.orderFormData.value }))
	}

  }

}

