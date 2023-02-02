
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rquote } from 'src/app/classes/rquote';
import { RquoteService } from 'src/app/services/rquote.service';

@Component({
  selector: 'app-rquote',
  templateUrl: './rquote.component.html',
  styleUrls: ['./rquote.component.css']
})
export class RquoteComponent implements OnInit {

  text = "";
  author = "";
  
  rquoteModelObj: Rquote = new Rquote();
  formValue !: FormGroup;

  rquote: Rquote | undefined;
  rquotes: Rquote[] = [];
  counter = 10;

  @Output() emitter = new EventEmitter();

  constructor(private rqs:RquoteService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.formValue = this.formBuilder.group({
      text : ['', Validators.required],
      author : [''],
      createdAt : [''],
    }) 

    this.getRQuote();
    // this.saveRQuote();
    }

  getRQuote() {
    if(this.rquotes.length == 0 || this.counter == 0)
    {
      this.emitter.emit(true);
      setTimeout(() => {
        this.rqs.getRQuotes().subscribe(x => {
          this.emitter.emit(false);
          this.rquote = x[Math.floor(Math.random()*1500)];
          this.rquotes = x;
          this.counter=10;
        });
      },500);
    }
    else{
      this.emitter.emit(true);
      setTimeout(() => { 
        this.emitter.emit(false);
        this.rquote = this.rquotes[Math.floor(Math.random()*1500)]; 
      },500);
      this.counter--;
    }
  }

  // saveRQuote(){
  //   this.rquoteModelObj.text = this.formValue.value.text;
  //   this.rquoteModelObj.author = this.formValue.value.author;
  //   this.rqs.postRQuotes(this.rquoteModelObj).subscribe(res=>{
  //     console.log(res);
  //     this.formValue.reset();
  //     this.getRQuote();
  //   },
  //   err =>{
  //     alert("Error, quote not added")
  //   })
  // }
}