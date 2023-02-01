import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postQuote(data:any){
    return this.http.post<any>("http://localhost:3000/quotes", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getQuote(){
    return this.http.get<any>("http://localhost:3000/quotes")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateQuote(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/quotes/" +id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteQuote(id:number){
    return this.http.delete<any>("http://localhost:3000/quotes/" +id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
