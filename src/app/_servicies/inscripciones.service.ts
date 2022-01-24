import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inscripciones } from "../_models/inscripciones";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })
export class InscripcionService implements HttpInterceptor{
    urlapi="http://localhost:5000/api/"

    constructor(private http : HttpClient, private router:Router) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
        const token: string = sessionStorage.getItem('token')!;
        let request = req;
    
        if (token) {
          request = req.clone({
            setHeaders: {
                token: "Bearer "+token
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