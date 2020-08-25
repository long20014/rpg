import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  marketEndpoint = 'https://5f10260300d4ab0016134804.mockapi.io/rpg/v1/market';

  constructor(
    private httpClient: HttpClient
  ) { }

  query(): Observable<any> {
    return this.httpClient.get<any>(this.marketEndpoint, {observe: 'response'});
  }

  find(itemId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.marketEndpoint}/${itemId}`, {observe: 'response'});
  }

  update(item: any): Observable<any> {
    return this.httpClient.put<any>(`${this.marketEndpoint}/${item.id}`, item, {observe: 'response'});
  }
}
