import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Rquote } from 'src/app/interfaces/rquote';
import { RquoteService } from 'src/app/services/rquote.service';

@Component({
  selector: 'app-rquote',
  templateUrl: './rquote.component.html',
  styleUrls: ['./rquote.component.css']
})
export class RquoteComponent implements OnInit {
  rquote: Rquote | undefined;
  rquotes: Rquote[] = [];
  counter = 10;
  @Output() emitter = new EventEmitter();
  constructor(private rqs:RquoteService) { }

  ngOnInit(): void {
    this.getRQuote();
    this.saveRQuote();
    }

  getRQuote() {
    if(this.rquotes.length == 0 || this.counter==0)
    {
      this.emitter.emit(true);
      setTimeout(() => {
        this.rqs.getRQuotes().subscribe(x => {
          this.emitter.emit(false);
          this.rquote = x[Math.floor(Math.random()*100)];
          this.rquotes = x;
          this.counter=10;
        });
      },500);
    }
    else{
      this.emitter.emit(true);
      setTimeout(() => { 
        this.emitter.emit(false);
        this.rquote = this.rquotes[Math.floor(Math.random()*100)]; 
      },500);
      this.counter--;
    }
  }

  saveRQuote(){}
}