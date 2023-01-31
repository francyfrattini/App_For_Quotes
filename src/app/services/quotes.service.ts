import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

//----------------------------------------SERVICES - ROOT FOR QUOTES---------------------------------------->

export class QuotesService {

  constructor(private http:HttpClient){}

  url="http://localhost:3000/quotes"

  fetchQuotes(){
    return this.http.get(this.url)
  }

  deleteQuote(id: string){
    return this.http.delete(this.url + "/" + id)
  }

  addQuotes(quote: any){
    return this.http.post(this.url, quote);
  }

  postQuotes(){
    return this.http.get(this.url)
  }

  getQuotes(){}
  
}
