import { LoginService } from './../_servicies/login.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inputFormControl= new FormControl('',[Validators.required])
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  hide=false;
  email
  constrasena
  error=false
  
  constructor(public service:LoginService,private route: Router) { 
  this.email=""
  this.constrasena=""
  }


  ngOnInit(): void {
  }

  login(){
    
    console.log("entro")
    this.service.login(this.email,this.constrasena).subscribe((resp)=>{
      
      sessionStorage.setItem('id',resp.toString())
      
      this.route.navigate(['home']);

    },
    error=>{
      this.error=true
    }


    );

    
  }



}
