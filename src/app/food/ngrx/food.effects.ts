import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as FoodActions from './food.actions';


@Injectable()
export class FoodEffects {

  createFoods$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(FoodActions.createFoods),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => FoodActions.createFoodsSuccess({ data })),
          catchError(error => of(FoodActions.createFoodsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
