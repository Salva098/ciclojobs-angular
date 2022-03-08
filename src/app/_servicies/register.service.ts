import { Observable } from 'rxjs/internal/Observable';
import { empresa } from './../_models/empresa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  urlapi="https://www.ciclojobs.ml/api/"
  constructor(private http : HttpClient) {}

  register(empresa:empresa):Observable<empresa>{
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.post<empresa>(this.urlapi+"Empresa",empresa,
    {headers :headers}
    )
  }
}
