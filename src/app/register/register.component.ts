import { RegisterService } from './../_servicies/register.service';
import { provincia } from './../_models/provincias';
import { emprsesa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ProvinciaService } from '../_servicies/provincias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  ProvinciasString: any = [];
  provincias:any=[]
  inputFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  hideConfirm = false;
  hide = false;
  nombreEmpresa = '';
  email = '';
  provinciaselect=0;
  password = '';
  passwordConfirm = '';
  localidad = '';
  direccion = '';
  registerForm= this._formBuilder.group({
    nombreFormControl:['', [Validators.required]],
    emailFormControl:['', [Validators.required]],
    direccionFormControl:['', [Validators.required]],
    localidadFormControl:['', [Validators.required]],
    provinciaFormControl:['', [Validators.required]],
    passwordFormControl:['', [Validators.required]],
    confirmpasswordFormControl:['', [Validators.required]],

  })

  constructor(private _formBuilder: FormBuilder,private route: Router,public service:ProvinciaService, public serviceRegister:RegisterService,private _snackBar: MatSnackBar) {
    this.ArrayProvincias()
    

  }
  ArrayProvincias(){
    this.service.getAllProvincias().subscribe(
      resp=>{
        resp.forEach(provincia => {
          this.provincias.push(provincia)
          this.ProvinciasString.push(provincia.provincias)
        });
        
        
      }
    )
  }
  ngOnInit() {}

  changeselected(prov: provincia){
    this.provinciaselect=prov.id;
  }

  toLogin(){
    this.route.navigate(['login'])
  }

  submit() {
    if(this.registerForm.valid){
    if (this.password == this.passwordConfirm) {

        console.log(this.provinciaselect)
        let empresa:emprsesa={
          email: this.email,
          nombre: this.nombreEmpresa,
          contrasena: this.password,
          localidad: this.localidad,
          direccion: this.direccion,
          idprovincias: this.provinciaselect
        };
        
        this.serviceRegister.register(empresa).subscribe(
          resp=>{
            this.toLogin();
          },
          error=>{
            
          }
          )
        }else{
          this._snackBar.open("Contraseña no concide", "cerrar",{
            duration: 3000,
          })
        }
      }else{
        this._snackBar.open("Rellena todos los campos", "cerrar",{
          duration: 3000,
        })
      }


  }
}
