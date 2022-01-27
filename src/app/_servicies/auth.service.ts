import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authService  implements HttpInterceptor{
    constructor(private router:Router) {
        
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
        const token: string = sessionStorage.getItem('token')!;
        let request = req;
    
        if (token) {
          request = req.clone({
            setHeaders: {
              Authorization: "Bearer "+token
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
}