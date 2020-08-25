import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEndpoint = 'https://5f10260300d4ab0016134804.mockapi.io/rpg/v1/user';

  constructor(
    private httpClient: HttpClient
  ) { }

  query(): Observable<any> {
    return this.httpClient.get<any>(this.userEndpoint, {observe: 'response'});
  }

  find(userId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.userEndpoint}/${userId}`, {observe: 'response'});
  }

  update(user: any): Observable<any> {
    return this.httpClient.put<any>(`${this.userEndpoint}/${user.id}`, user, {observe: 'response'});
  }
}
