import { EmpresaService } from './../_servicies/empresa.service';
import { LoginService } from './../_servicies/login.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  hide=false;
  email
  constrasena
  codetxt=""
  code=false;
  error=false;
  token=""
  formcode=this._formBuilder.group({
    codeCtrl:['',[Validators.required]]
  })
  form=this._formBuilder.group({
    inputFormControl: ['',[Validators.required]],
    emailFormControl: ['', [Validators.required, Validators.email]]

  })
  constructor(private _formBuilder: FormBuilder,public service:LoginService,private route: Router,private _snackBar: MatSnackBar,private empresa:EmpresaService) { 
  this.email=""
  this.constrasena=""
  }


  ngOnInit(): void {
  }

  verificarAccount(){
    if(this.form.valid){
      this.empresa.verificarAccount(this.email.toString(),this.codetxt).subscribe((resp)=>{
        sessionStorage.setItem('token',this.token)
    
        this.route.navigate(["/home"]);
      })
    }
  }


  login(){
    
    if(this.form.valid){

      console.log("entro")
      this.service.login(this.email.toString(),this.constrasena.toString()).subscribe((resp)=>{
        this.token=resp.headers.get('token')!
          this.empresa.checkAccount(this.email.toString()).subscribe(data=>{
            sessionStorage.setItem('token',this.token)
    
            this.route.navigate(["/home"]);
           
          },(error) => {
            this.empresa.sendemail(this.email.toString()).subscribe(enviado=>{
              this.code=true;
              
            },error => {
              this._snackBar.open("Error al enviar el codigo", "cerrar",{
                duration: 3000,
              })
            })

          })
       
      },
      error=>{
        this._snackBar.open("Error al login", "cerrar",{
          duration: 3000,
        })
        this.error=true
      }
      
      
      );
    }else{
      this._snackBar.open("Rellena todos los campos", "cerrar",{
        duration: 3000,
      })
    }

    
  }



}
