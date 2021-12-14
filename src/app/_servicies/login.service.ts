import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlapi="http://localhost:5000/api/"
  constructor(private http : HttpClient) {}

  login(email:string,contrasena:string){
    const headers = new HttpHeaders({"accept":"text/plain","Content-Type":"application/json"})
    return this.http.post(this.urlapi+"Empresa/Login",
    {
      "email": email,
      "contrasena": contrasena
    },
    {headers :headers}
    )
  }
}
