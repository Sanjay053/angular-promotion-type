// Interface defining the structure of a single promotion state
export interface PromoStateM {
    id: string;
    name: string;
    factor: number;
    uom: string;
    amount: number;
    itemLimit: number;
    minQuantity: number;
  }
  
  // Interface defining the structure of the overall promotion state in the application
  export interface PromoStateModel {
    list: PromoStateM[];
    editdata: PromoStateM;
    errorMessage: string;
  }
  