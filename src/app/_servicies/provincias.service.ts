import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { provincia } from '../_models/provincias';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  urlapi="http://localhost:5000/api/"
  constructor(private http : HttpClient) {}

  getAllProvincias():Observable<Array<provincia>>{
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.get<Array<provincia>>(this.urlapi+"Provincias",
    {headers :headers}
    )
  }
}
