import { Alumnos } from './../_models/alumno';
import { Observable } from 'rxjs/internal/Observable';
import { empresa } from './../_models/empresa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  urlapi="https://www.ciclojobs.ml/api/"
  constructor(private http : HttpClient) {}

  GetAll(){
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.get<Array<Alumnos>>(this.urlapi+"Alumno",{headers :headers})
  }
}
