import { Injectable } from "@angular/core";
import { MasterService } from "../../_service/master.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getPromotion, getPromotionSuccess, loadPromotionTypes, loadPromotionTypesFailure, loadPromotionTypesSuccess, updatePromotionTypes, updateromotionTypesSuccess } from "./promo.action";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class PromotionEffects {
    constructor(private action$: Actions, private service: MasterService) { }

    // Effect to load all promotion types
    _loadPromotion = createEffect(() =>
        this.action$.pipe(
            ofType(loadPromotionTypes),
            exhaustMap(() => {
                return this.service.getAll().pipe(
                    map((data) => loadPromotionTypesSuccess({ list: data })),
                    catchError((error) => of(loadPromotionTypesFailure({ errormessage: error.message })))
                )
            })
        ))

    // Effect to get a single promotion by ID
    _getPromotion = createEffect(() =>
        this.action$.pipe(
            ofType(getPromotion),
            exhaustMap((action) => {
                return this.service.GetPromotionById(action.id).pipe(
                    map((data) => getPromotionSuccess({ obj: data })),
                    catchError((error) => of(loadPromotionTypesFailure({ errormessage: error.message })))
                )
            })
        ))

    // Effect to update a promotion
    _updatePromotion = createEffect(() =>
        this.action$.pipe(
            ofType(updatePromotionTypes),
            exhaustMap((action) => {
                return this.service.updatePromotion(action.id, action.changes).pipe(
                    map(() => updateromotionTypesSuccess()),
                    catchError((error) => of(loadPromotionTypesFailure({ errormessage: error.message })))
                )
            })
        ))
}
