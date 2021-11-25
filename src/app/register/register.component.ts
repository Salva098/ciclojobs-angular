import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  Provincias: any = ['Málaga', 'Sevilla', 'Betis'];
  inputFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  hideConfirm = false;
  hide = false;
  nombreEmpresa = '';
  email = '';
  password = '';
  passwordConfirm = '';
  localidad = '';
  direccion = '';
  constructor(private route: Router) {}

  ngOnInit() {}

  submit() {
    if (this.password == this.passwordConfirm) {
      this.route.navigate(['login']);
    }
  }
}
