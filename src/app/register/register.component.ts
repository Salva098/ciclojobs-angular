import { StripeService } from './../_servicies/stripe.service';
import { RegisterService } from './../_servicies/register.service';
import { provincia } from './../_models/provincias';
import { empresa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProvinciaService } from '../_servicies/provincias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpresaService } from '../_servicies/empresa.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  ProvinciasString: any = [];
  provincias: any = [];
  premium=true;
  
  inputFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  code = false;
  hideConfirm = false;
  hide = false;
  empresa:empresa={
    email: '',
    nombre: '',
    idprovincias: 0,
    localidad: '',
    direccion: ''
  };
  nombreEmpresa = '';
  email = '';
  provinciaselect = 0;
  password = '';
  passwordConfirm = '';
  localidad = '';
  codeverify = '';
  direccion = '';
  registerForm = this._formBuilder.group({
    nombreFormControl: ['', [Validators.required]],
    emailFormControl: ['', [Validators.required]],
    direccionFormControl: ['', [Validators.required]],
    localidadFormControl: ['', [Validators.required]],
    provinciaFormControl: ['', [Validators.required]],
    passwordFormControl: ['', [Validators.required]],
    confirmpasswordFormControl: ['', [Validators.required]],
    premium: [''],
  });
  CodeFormControl = new FormControl(['', [Validators.required]]);
  constructor(
    private _formBuilder: FormBuilder,
    private route: Router,
    public service: ProvinciaService,
    public serviceRegister: RegisterService,
    public serviceStripe: StripeService,
    private _snackBar: MatSnackBar,
    private serviceEmpresa: EmpresaService
  ) {
    this.ArrayProvincias();
  }
  ArrayProvincias() {
    this.service.getAllProvincias().subscribe((resp) => {
      resp.forEach((provincia) => {
        this.provincias.push(provincia);
        this.ProvinciasString.push(provincia.provincias);
      });
    });
  }
  ngOnInit() {}

  changeselected(prov: provincia) {
    this.provinciaselect = prov.id;
  }

  generatecode() {
    
    console.log(this.registerForm.value.premium)
    if (this.registerForm.valid) {
      if (this.password == this.passwordConfirm) {
        let empresa: empresa = {
          email: this.email,
          nombre: this.nombreEmpresa,
          contrasena: this.password,
          localidad: this.localidad,
          direccion: this.direccion,
          idprovincias: this.provinciaselect,
        };
        this.serviceRegister.register(empresa).subscribe((resp:empresa) => {
          this.empresa=resp;
          console.log(this.empresa)
            this.serviceEmpresa.sendemail(this.email).subscribe((data) => {
              this.code = true;
            });




                    
        });
      } else {
        this._snackBar.open('Contraseña no concide', 'cerrar', {
          duration: 3000,
        });
      }
    } else {
      this._snackBar.open('Rellena todos los campos', 'cerrar', {
        duration: 3000,
      });
    }
  }

  submit() {
    if (this.CodeFormControl.valid) {
      this.serviceEmpresa.verificarcode(this.email, this.codeverify).subscribe(
        (data) => {
          if(this.registerForm.value.premium){

            this.serviceStripe.generarUrlPago(this.empresa).subscribe((url)=>{
              window.location.href=url
            })       
          }else{
            this.route.navigate(['login'])
          }
         
        },
        (error) => {
          this._snackBar.open('No es el codigo', 'cerrar', {
            duration: 3000,
          });
        }
      );
    } else {
      this._snackBar.open('Rellene el codigo de verificacion', 'cerrar', {
        duration: 3000,
      });
    }
  }
}
