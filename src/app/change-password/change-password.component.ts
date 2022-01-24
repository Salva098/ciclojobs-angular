import { Router } from '@angular/router';
import { empresa } from './../_models/empresa';
import { EmpresaService } from './../_servicies/empresa.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private service: EmpresaService,
    private router:Router
  ) {}
  form = this._formBuilder.group({
    emailFormControl: ['', [Validators.required, Validators.email]],
  });
  firstFormGroup = this._formBuilder.group({
    emailCtrl: ['', [Validators.required, Validators.email]],
  });
  secondFormGroup = this._formBuilder.group({
    codeCtrl: ['', [Validators.required]],
  });
  thirdFormGroup = this._formBuilder.group({
    Password: ['', [Validators.required]],
    confirmPassword:['', [Validators.required]]
  });
  password="";
  confirmpassword="";
  code = '';
  email = '';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  confirmPasswordControl=new FormControl('', [Validators.required])
  PasswordControl=new FormControl('', [Validators.required])
  codeFormControl = new FormControl('', [Validators.required]);

  step=true;




  codeVerify(stepper: MatStepper) {
    if (this.secondFormGroup.valid) {
      this.service.checkcode(this.email, this.code).subscribe(
        (data) => {
          console.log('verificado');
          this.step=false;
          stepper.next();
        },
        (error) => {
          console.log('error');
        }
      );
    }
  }

  sendemail(stepper: MatStepper) {
    if (this.firstFormGroup.valid) {
      this.service.sendemail(this.email).subscribe(
        (data) => {
          console.log('enviado');
          stepper.next();
        },
        (error) => {
          console.log('no enviado');
        }
      );
    }
  }
  changepassword(){
    let empre:empresa;
    if(this.thirdFormGroup.valid){
      if(this.password===this.confirmpassword){
         this.service.getEmpresaEmail(this.email.replace('@','%40')).subscribe((data)=>{
          empre=data
          empre.contrasena=this.password;
          this.service.actualizarEmpresa(empre!).subscribe((data)=>{
            this.router.navigate(['login']);
          })
        })
      }
    }


  }

  ngOnInit(): void {}
}
