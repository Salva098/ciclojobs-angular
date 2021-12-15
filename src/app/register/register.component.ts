import { RegisterService } from './../_servicies/register.service';
import { provincia } from './../_models/provincias';
import { emprsesa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ProvinciaService } from '../_servicies/provincias.service';
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
  constructor(private route: Router,public service:ProvinciaService, public serviceRegister:RegisterService) {
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
    // this.route.navigate.
  }

  submit() {
    if (this.password == this.passwordConfirm) {
      let idprovincia:number=0;
      
      // this.provincias.forEach((prov: provincia) => {
      //   if(prov.provincias==this.provinciaselect){
      //     idprovincia=prov.id
      //   }
      // });
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
    }


  }
}
