import { PromoStateModel } from "../Model/promo.model";

// Initial promo state
export const PromoState: PromoStateModel = {
    list: [], 
    errorMessage: '', 

    // Default values for editing a promotion
    editdata: {
        id: "",
        name: "",
        factor: 0,
        uom: "EA",
        amount: 0, 
        itemLimit: 0,  
        minQuantity: 0 
    },
}
