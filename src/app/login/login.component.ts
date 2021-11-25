import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inputFormControl= new FormControl('',[Validators.required])
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  hide=true;
  constructor() { }

  ngOnInit(): void {
  }

}
