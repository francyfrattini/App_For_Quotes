import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rquote } from '../interfaces/rquote';

@Injectable({
  providedIn: 'root'
})
export class RquoteService {

  constructor(private http:HttpClient) { }

  getRQuotes() :Observable<Rquote[]>{
      return this.http.get<Rquote[]>('https://type.fit/api/quotes');
  }

  saveRQuote(){

  }

}
