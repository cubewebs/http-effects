import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Food } from 'src/app/shared/models/Food';
import { addOrder } from '../store/order.actions';
import { OrderState } from '../store/order.reducer';
import { FoodService } from '../service/food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.scss']
})
export class FoodOrderComponent implements OnInit {

  selectedFood: Food[] = [];
	
  orderFormData: FormGroup = this.fb.group({

    id: [],
    userId: [], 
    firstName: [ , [Validators.required]],
    lastName: [ , [Validators.required]],
    email: [ , [Validators.required]],
    phoneNumber: [ , [Validators.required]],
    address: [ , [Validators.required]],
    zip: [ , [Validators.required]],
    privacy: ['true'],
    foodOrder: [],

  })

  constructor(
    private fb: FormBuilder,
    private store: Store<OrderState>,
	private route: Router
  ) {}

  get orderFood() {
    return this.orderFormData.controls['foodOrder'] as FormControl;
  }

  get orderId() {
    return this.orderFormData.controls['id'].value;
  }

  ngOnInit(): void {}

  addNewOrder() {
	if(this.orderFormData.invalid) { return }
    this.store.dispatch(addOrder({ order: this.orderFormData.value }))
	this.route.navigate([`/food/${this.orderId}`])
	this.orderFormData.reset();
  }

}

