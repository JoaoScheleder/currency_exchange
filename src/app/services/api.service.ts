import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url : string = 'https://economia.awesomeapi.com.br/json/'
  constructor(private http : HttpClient) { }

  getExchangeRate(code : string) : Observable<any>{
    return this.http.get(`${this.url}daily/${code}-BRL`)
  }

  getLast30days(code : string) : Observable<any>{
    return this.http.get(`${this.url}daily/${code}-BRL/30`)
  }
}
