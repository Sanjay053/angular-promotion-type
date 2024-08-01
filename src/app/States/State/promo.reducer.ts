import { createReducer, on } from "@ngrx/store";
import { PromoState } from "./promo.state";
import { getPromotionSuccess, loadPromotionTypesFailure, loadPromotionTypesSuccess } from "./promo.action";

// Reducer function handling state changes based on actions
const _PromotionReducer = createReducer(PromoState,

    // Action handler for successful loading of promotion types
    on(loadPromotionTypesSuccess, (state, action) => {
        return {
            ...state,
            list: action.list,
            errorMessage: '',
            editdata: {
                id: "",
                name: "",
                factor: 0,
                uom: "EA",
                amount: 0,
                itemLimit: 0,
                minQuantity: 0,
                fields: undefined
            }
        }
    }),

    // Action handler for successful retrieval of a single promotion
    on(getPromotionSuccess, (state, action) => {
        return {
            ...state,
            errorMessage: '',
            editdata: action.obj
        }
    }),

    // Action handler for failure in loading promotion types
    on(loadPromotionTypesFailure, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: ''
        }
    })
)

// Export function to use in the store
export function promotionReducer(state:any, action:any){
    return _PromotionReducer(state, action);
}
