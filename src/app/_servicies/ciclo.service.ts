import { ciclo } from './../_models/ciclo';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CicloService {

  urlapi="http://localhost:5000/api/"
  constructor(private http : HttpClient) {}


getAllCiclos():Observable<Array<ciclo>>{
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.get<Array<ciclo>>(this.urlapi+"ciclo",
    {headers :headers}
    )
}


}
