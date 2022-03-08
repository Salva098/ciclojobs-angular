import { Observable } from 'rxjs/internal/Observable';
import { empresa } from './../_models/empresa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  urlapi="https://www.ciclojobs.ml/api/"
  constructor(private http : HttpClient) {}

  existPremium(){
    return this.http.get(this.urlapi+"Stripe/Exist",
    {responseType: 'text'}
    )
  }

  generarUrlPago(empresa:empresa){
    return this.http.post(this.urlapi+"Stripe",empresa,
    {responseType: 'text'}
    )
  }
}
