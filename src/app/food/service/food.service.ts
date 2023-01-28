import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Food } from 'src/app/shared/models/food';


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
}
