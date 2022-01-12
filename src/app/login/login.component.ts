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
  error=false
  form=this._formBuilder.group({
    inputFormControl: ['',[Validators.required]],
    emailFormControl: ['', [Validators.required, Validators.email]]

  })
  constructor(private _formBuilder: FormBuilder,public service:LoginService,private route: Router,private _snackBar: MatSnackBar) { 
  this.email=""
  this.constrasena=""
  }


  ngOnInit(): void {
  }

  login(){
    
    if(this.form.valid){

      console.log("entro")
      this.service.login(this.email,this.constrasena).subscribe((resp)=>{
        
        sessionStorage.setItem('id',resp.toString())
        
        this.route.navigate(['home']);
        
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
