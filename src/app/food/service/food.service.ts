import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Food } from 'src/app/shared/models/Food';
import { Order } from '../../shared/models/Order';
import { Update } from '@ngrx/entity';


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

  getAllOrders(): Observable<Order[]> {
	const url = `${this.baseUrl}/order`;

	return this.http.get<Order[]>(url)
  }

  getOrderById(id: number): Observable<Order> {
	const url = `${this.baseUrl}/order/${id}`;

	return this.http.get<Order>(url)
  }

  addOrder(order: Order): Observable<Order> {
	const url: string = `${this.baseUrl}/order`;
	return this.http.post<Order>(url, order)
  }

  deleteOrder(id: number): Observable<Order> {
	const url = `${this.baseUrl}/order/${id}`;
	return this.http.delete<Order>(url)
  }

  updateOrder(id: number, changes: Partial<Order>): Observable<Update<Order>> {
	const url = `${this.baseUrl}/order/${id}`;
	return this.http.put<Update<Order>>(url, changes)
  }

  searchOrders(query: string): Observable<Order[]> {
	const url = `${this.baseUrl}/order/?q=${query}`;
	return this.http.get<Order[]>(url)
  } 
  
}
