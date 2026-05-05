import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { printfulListResponse, printfulDetailResponse, printfulSyncProduct, printfulProductDetail, shippingRatesPayload, orderPayload } from '../models/printful-model';
import localProducts from '../data/products.json';

@Injectable({
  providedIn: 'root'
})
export class PrintfulApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://dropship.destroyocean.city';

  getProducts(): Observable<printfulSyncProduct[]> {
    return this.http.get<printfulListResponse>(`${this.baseUrl}/store/products`).pipe(
      map(res => res.result.map(product => {
        const local = localProducts.printfulProducts.find(p => p.id === product.id);
        if (local) return { ...product, ...local };
        return { ...product, slogans: localProducts.genericContent.slogans };
      }))
    );
  }

  getProduct(id: number): Observable<printfulProductDetail> {
    return this.http.get<printfulDetailResponse>(`${this.baseUrl}/store/products/${id}`).pipe(
      map(res => {
        const detail = res.result;
        const local = localProducts.printfulProducts.find(p => p.id === detail.sync_product.id);
        if (local) {
          detail.sync_product = { ...detail.sync_product, ...local };
        } else {
          detail.sync_product = { ...detail.sync_product, slogans: localProducts.genericContent.slogans };
        }
        return detail;
      })
    );
  }

  getShippingRates(payload: shippingRatesPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/shipping/rates`, payload);
  }

  submitOrder(payload: orderPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orders`, payload);
  }

  getOrder(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/orders/${id}`);
  }
}