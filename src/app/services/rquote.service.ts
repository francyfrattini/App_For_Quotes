import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Rquote } from '../classes/rquote';

@Injectable({
  providedIn: 'root'
})
export class RquoteService {

  constructor(private http: HttpClient) { }

  getRQuotes(): Observable<Rquote[]> {
    return this.http.get<Rquote[]>('https://type.fit/api/quotes');
  }

  postRQuotes(data: any): Observable<Rquote[]> {
    return this.http.post<Rquote[]>('http://localhost:3000/quotes', data);
  }

}
