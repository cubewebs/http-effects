import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Food } from 'src/app/shared/models/Food';
import { addOrder } from '../store/order.actions';
import { OrderState } from '../store/order.reducer';
import { FoodService } from '../service/food.service';

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
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    address: [],
    zip: [],
    privacy: ['true'],
    foodOrder: [],

  })

  constructor(
    private fb: FormBuilder,
    private store: Store<OrderState>,
    private fs: FoodService
  ) {}

  get orderFood() {
    return this.orderFormData.controls['foodOrder'] as FormControl;
  }

  ngOnInit(): void {}

  addNewOrder() {
    this.store.dispatch(addOrder({ order: this.orderFormData.value }))
  }

}

