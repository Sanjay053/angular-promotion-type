import { createAction, props } from '@ngrx/store';
import { PromoStateM } from '../Model/promo.model';

// Load Promotion Types Actions
export const LOAD_PROMOTION = '[Promotion] Load Promotion Types';
export const LOAD_PROMOTION_SUCCESS = '[Promotion] Load Promotion Types Success';
export const LOAD_PROMOTION_FAIL = '[Promotion] Load Promotion Types Failure';

export const loadPromotionTypes = createAction(LOAD_PROMOTION);
export const loadPromotionTypesSuccess = createAction(
  LOAD_PROMOTION_SUCCESS,
  props<{ list: PromoStateM[] }>()
);
export const loadPromotionTypesFailure = createAction(
  LOAD_PROMOTION_FAIL,
  props<{ errormessage: string }>()
);

// Get Promotion Actions
export const GET_PROMOTION = '[Promotion] Get Promotion';
export const GET_PROMOTION_SUCCESS = '[Promotion] Get Promotion Success';

export const getPromotion = createAction(
  GET_PROMOTION,
  props<{ id: string }>()
);
export const getPromotionSuccess = createAction(
  GET_PROMOTION_SUCCESS,
  props<{ obj: PromoStateM }>()
);

// Update Promotion Actions
export const UPDATE_PROMOTION = '[Promotion] Update Promotion';
export const UPDATE_PROMOTION_SUCCESS = '[Promotion] Update Promotion Success';

export const updatePromotionTypes = createAction(
  UPDATE_PROMOTION,
  props<{ id: string; changes: Partial<PromoStateM> }>()
);
export const updateromotionTypesSuccess = createAction(UPDATE_PROMOTION_SUCCESS);
