import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/internal/Observable';
import { Inscripciones } from "../_models/inscripciones";

@Injectable({
    providedIn: 'root'
  })
export class InscripcionService{
    urlapi="http://localhost:5000/api/"
    constructor(private http : HttpClient) {}

    getInscripciones(id:string | null):Observable<Array<Inscripciones>>{
        const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
        return this.http.get<Array<Inscripciones>>(this.urlapi+"Inscripciones/Empresa/"+id,
        {headers :headers}
        )
    }
}