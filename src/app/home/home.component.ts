import { StripeService } from './../_servicies/stripe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public serviceStripe: StripeService,) { }
  premium=false;
  ngOnInit(): void {

    this.serviceStripe.existPremium().subscribe((data)=>{
      this.premium=true;
    },(error)=>{
      this.premium=false;
    })
  }
  cerrarsesion(){
    sessionStorage.setItem("token","");
    window.location.reload()
  }

}
