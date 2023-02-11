import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Food } from 'src/app/shared/models/Food';
import { Order } from '../../shared/models/Order';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

	baseUrl = 'http://localhost:3000';

  constructor(
	private http: HttpClient
  ) { }

  getFoodList(): Observable<Food[]> {
	const url = `${this.baseUrl}/food`;

	return this.http.get<Food[]>(url)
	
  }

  addOrder(order: Order): Observable<Order> {
	const url: string = `${this.baseUrl}/order`;
	return this.http.post<Order>(url, order)
  }
}
