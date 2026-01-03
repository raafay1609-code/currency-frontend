import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CurrencyService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<any> {
    return this.http.get(`${this.BASE_URL}currencies`)
  }

  // getExchangeRate(from: string, to: string, date?: string, amount?: number): Observable<any> {
  //   return this.http.get(`${this.BASE_URL}convert?base_currency=${from}&target_currency=${to}${date ? `&date=${date}` : ''}`)

  // }

  getExchangeRate(convertDTO: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}convert`, convertDTO)
  }
}
