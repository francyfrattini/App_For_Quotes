
import { Component, Input, OnInit, VERSION } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})

//----------------------------------------ADD - GET - DELETE QUOTES---------------------------------------->

export class QuotesComponent implements OnInit {

  searchText: any;
  clipboard: any;
  orderId: String = '';

  constructor(private qs: QuotesService){}

  quoteDate = new Date()
  date = this.quoteDate;
  quotes: any;
  quote = "";
  author = "";

  ngOnInit(): void {

    this.qs.fetchQuotes().subscribe(
      (data) => {
        this.quotes = data
      },
      (error) => {
        console.log("err")
      }
    )
  }

  getQuotes() { }

  addQuotes(formObj: any) {
    console.log(formObj);
    this.qs.addQuotes(formObj).subscribe((response) => {
      console.log("Quote added");
    })
  }

  deleteQuote(id: string) {
    this.qs.deleteQuote(id).subscribe(
      (res) => {
        this.getQuotes()
      }
    )
  }

  public onClipboardCopy(successful: boolean): void {
    console.log(successful);
  }

  key = 'id';
  reverse:boolean = false;
  sort(key: string){
    this.key = key;
    this.reverse = !this.reverse;
  }
  
}

  
  


