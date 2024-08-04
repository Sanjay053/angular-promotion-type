import { Routes } from '@angular/router';
import { PromotionFormComponent } from './promotion-form/promotion-form.component';
import { PromoListComponent } from './promo-list/promo-list.component';

export const routes: Routes = [
    { path: '', component: PromoListComponent },
];
