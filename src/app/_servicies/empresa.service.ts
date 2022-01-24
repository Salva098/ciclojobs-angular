import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { empresa } from "../_models/empresa";
import { ofertacreate, ofertas } from "../_models/oferta";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    const token: string = sessionStorage.getItem('token')!;
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: "Bearer "+token
        }
      });
    }


    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError( err );

      })
    );
  }
  urlapi="http://localhost:5000/api/"
  constructor(private http : HttpClient,private router:Router) {}

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
  checkcode(email:string,code:string){
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.post(this.urlapi+"Empresa/VerificarCode?email="+email+"&code="+code,{headers :headers});
  }
  getEmpresaEmail(email:string):Observable<empresa>{
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.get<empresa>(this.urlapi+"Empresa/EmailEmpresa?email="+email,{headers :headers});
  }
  actualizarEmpresa(empresa:empresa){
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.put(this.urlapi+"Empresa",empresa,{headers :headers});
  }
}
