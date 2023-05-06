import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, pipe } from 'rxjs';
import { FoodService } from 'src/app/food/service/food.service';
import * as orderActions from '../../food/store/order.actions';
import * as orderSelectors from '../../food/store/order.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  query: string = '';

  constructor(
    private store: Store
  ) {}

  searchQurey(query: string) {
    
    this.store.dispatch(orderActions.searchOrders({query, searching: true}));
    
  }

}
