import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PromoStateM } from '../States/Model/promo.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  // Base URL for the API endpoint
  private baseUrl = "http://localhost:3000/promotionTypes";

  constructor(private http: HttpClient) { }

  // Fetch all promotion types
  getAll(): Observable<PromoStateM[]> {
    return this.http.get<PromoStateM[]>(this.baseUrl);
  }

  // getById(id: string): Observable<PromoStateM[]>{
  //   return this.http.get<PromoStateM>(`${this.baseUrl}?id=${id}`);
  // }

  // Fetch a single promotion type by ID
  GetPromotionById(id: string): Observable<PromoStateM> {
    return this.http.get<PromoStateM>(`${this.baseUrl}?id=${id}`);
  }

  // Update a promotion type by ID with new data
  updateById(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  // Update promotion type using partial changes
  updatePromotion(id: string, changes: Partial<PromoStateM>): Observable<PromoStateM> {
    return this.http.put<PromoStateM>(`${this.baseUrl}/${id}`, changes);
  }
}
