import { Observable } from 'rxjs/internal/Observable';
import { empresa } from './../_models/empresa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  // urlapi="http://51.254.98.153/api/"
  urlapi="http://localhost:5000/api/"
  constructor(private http : HttpClient) {}

  generarUrlPago(empresa:empresa){
    return this.http.post(this.urlapi+"Contract",empresa,
    {responseType: 'text'}
    )
  }
}
