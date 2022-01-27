import { HttpClient,  HttpHeaders,} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { empresa } from "../_models/empresa";
import { ofertacreate, ofertas } from "../_models/oferta";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService{
 
  urlapi="http://localhost:5000/api/"
  constructor(private http : HttpClient) {}

  getEmpresaid():Observable<empresa>{
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.get<empresa>(this.urlapi+"Empresa/ID",
    {headers :headers}
    )
  }
  getOfertasEmpresa():Observable<Array<ofertas>>{
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.get<Array<ofertas>>(this.urlapi+"Oferta/Empresa",
    {headers :headers}
    ) 
  }
  addOfertaEmpresa(oferta:ofertacreate){
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.post(this.urlapi+"Oferta", oferta,{headers :headers});
  }
  sendemail(email:string){
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.post(this.urlapi+"Empresa/GenerarCode?email="+email,{headers :headers});
  }
  verificarcode(email:string,code:string){
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.post(this.urlapi+"Empresa/VerificarCode?email="+email+"&code="+code,{headers :headers});
  }
  verificarAccount(email:string,code:string){
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.post(this.urlapi+"Empresa/VerificarAccount?email="+email+"&code="+code,{headers :headers});
  }
  
  checkAccount(email:string){
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.post(this.urlapi+"Empresa/CheckAccount?email="+email,{headers :headers});
  }
  getEmpresaEmail(email:string):Observable<empresa>{
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.get<empresa>(this.urlapi+"Empresa/EmailEmpresa?email="+email,{headers :headers});
  }
  actualizarEmpresa(empresa:empresa){
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.put(this.urlapi+"Empresa",empresa,{headers :headers});
  }
  sendEmailAlumno(emailalumno:string,tituloOferta:string,mensaje:string){
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.post(this.urlapi+"Empresa/SendEmail?emailalumno="+emailalumno+"&tituloOferta="+tituloOferta+"&mensaje="+mensaje,{headers :headers});
  }
}
