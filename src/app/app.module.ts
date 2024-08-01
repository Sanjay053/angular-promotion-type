// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'; 
// import { RouterModule } from '@angular/router';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { HttpClientModule } from '@angular/common/http';
// import { AppComponent } from './app.component';
// import { PromoListComponent } from './promo-list/promo-list.component';
// import { promotionReducer } from './promotion-store/promo.reducer';
// import { PromotionEffects } from './promotion-store/promo.effects';

// @NgModule({
//     declarations: [
//         AppComponent,
//         PromoListComponent
//     ],
//     imports: [
//         BrowserModule,
//         NoopAnimationsModule,
//         BrowserAnimationsModule,
//         HttpClientModule,
//         RouterModule.forRoot([
//             { path: '', component: AppComponent },
//         ]),
//         StoreModule.forRoot({}, { metaReducers: [] }), 
//         StoreModule.forFeature('promotion', promotionReducer),
//         EffectsModule.forRoot([]),
//         EffectsModule.forFeature([PromotionEffects]) 
//     ],
//     providers: [],
//     bootstrap: [AppComponent]
// })
// export class AppModule { }
