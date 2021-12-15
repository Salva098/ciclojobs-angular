import { Observable } from 'rxjs/internal/Observable';
import { emprsesa } from './../_models/empresa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  urlapi="http://localhost:5000/api/"
  constructor(private http : HttpClient) {}

  getEmpresaid(id:string|null):Observable<emprsesa>{
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.get<emprsesa>(this.urlapi+"Empresa/"+id,
    {headers :headers}
    )
  }
}
