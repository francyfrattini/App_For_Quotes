
import { Component, Input, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Quote } from './quote.model';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})

export class QuotesComponent implements OnInit {

  formValue !: FormGroup;

  text = "";
  author = "";

  quoteModelObj: Quote = new Quote();
  quoteData:any;

  searchText: any; //search
  clipboard: any; //copy clipboard
  orderId: String = ''; //order by id

  constructor(private api:ApiService, private formBuilder: FormBuilder){
  }

  ngOnInit(): void {

    //form builder
    this.formValue = this.formBuilder.group({
      text : ['', Validators.required],
      author : [''],
      createdAt : [''],
    }) 

    this.getAllQuotes();
  }

  //add a new quote
  addQuote(){
      this.quoteModelObj.text = this.formValue.value.text;
      this.quoteModelObj.author = this.formValue.value.author;

      this.api.postQuote(this.quoteModelObj).subscribe(res=>{
        console.log(res);
        Swal.fire({ //alert quote added
          position: 'center',
          title: 'Your quote has been added',
          icon: "success",
          background: "#000000",
          color: "#FFFFFF",
          showConfirmButton: false,
          timer: 1200
        })
        this.formValue.reset();
        this.getAllQuotes();
      },
      err =>{
        alert("Error, quote not added") //alert quote not added
      })
  }

  //get all quotes
  getAllQuotes(){
    this.api.getQuote().subscribe(res=>{
      this.quoteData = res;
    })
  }

  //delete a quote
  deleteQuote(quote:any){
    Swal.fire({
      title: "You really want to delete this quote?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "#000000",
      color: "#FFFFFF",
      confirmButtonColor: "#A2A2A2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.value){
        this.api.deleteQuote(quote.id).subscribe(res=>{
          this.getAllQuotes();
        })
      Swal.fire({
        title: "Ok, your quote has been deleted.",
        icon: "success",
        background: "#000000",
        color: "#FFFFFF",
        confirmButtonColor: "#A2A2A2",
      })
     }
      else if (
       result.dismiss === Swal.DismissReason.cancel
    ) {
       Swal.fire({
         title: "Ok, your quote is safe!",
         background: "#000000",
         color: "#FFFFFF",
         confirmButtonColor: "#A2A2A2",
       })
     }
   });
  }

  //order quote by id
  key = 'id';
  reverse:boolean = false;
  sort(key: string){
    this.key = key;
    this.reverse = !this.reverse;
  }

  //copy quote
  public async onClipboardCopy(successful: boolean): Promise<void> {
    console.log(successful);
    const Toast = Swal.mixin({
      toast: true,
      position: 'center-right',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
     timer: 1000,
    })
    await Toast.fire({
      title: 'Quote copied successfully'
    })
    
  }
}