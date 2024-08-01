import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PromoStateModel } from "../Model/promo.model";

// Selector to get the promotion state from the store
const getpromotionstate = createFeatureSelector<PromoStateModel>('promote');

// Selector to get the list of promotions from the promotion state
export const getpromotionlist = createSelector(
    getpromotionstate,
    (state) => state.list
);

// Selector to get the edit data from the promotion state
export const editpromotionlist = createSelector(
    getpromotionstate,
    (state) => state.editdata
);
