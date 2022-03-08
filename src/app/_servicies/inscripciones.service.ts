import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inscripciones } from "../_models/inscripciones";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })
export class InscripcionService{
    urlapi="https://www.ciclojobs.ml/api/"

    constructor(private http : HttpClient) {}

    getInscripciones():Observable<Array<Inscripciones>>{
        const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
        return this.http.get<Array<Inscripciones>>(this.urlapi+"Inscripciones/Empresa",
        {headers :headers}
        )
    }
    updateIncripcion(inscripcion:Inscripciones){
        const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
        return this.http.put(this.urlapi+"Inscripciones",inscripcion,{headers :headers},)
        
    }
}