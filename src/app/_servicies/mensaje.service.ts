import { mensaje } from './../_models/mensaje';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { provincia } from '../_models/provincias';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  urlapi="http://51.254.98.153/api/"
  constructor(private http : HttpClient) {}

  EnviarMensaje(mensaje:mensaje){
      console.log(mensaje)
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.post(this.urlapi+"Mensajes",mensaje,
    {headers :headers}
    )
  }
}
