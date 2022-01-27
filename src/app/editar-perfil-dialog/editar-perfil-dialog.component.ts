import { empresa } from './../_models/empresa';
import { EmpresaService } from './../_servicies/empresa.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProvinciaService } from '../_servicies/provincias.service';
import { provincia } from '../_models/provincias';

@Component({
  selector: 'app-editar-perfil-dialog',
  templateUrl: './editar-perfil-dialog.component.html',
  styleUrls: ['./editar-perfil-dialog.component.css']
})
export class EditarPerfilDialogComponent implements OnInit {
  prov:any=[]
  provselect: number=0;
  emp:empresa={
    email: '',
    nombre: '',
    idprovincias: 0,
    localidad: '',
    direccion: ''
  }
  
  constructor(public dialogRef: MatDialogRef<EditarPerfilDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private service:EmpresaService,
    private provincias:ProvinciaService,
    private _snackBar: MatSnackBar) { }
    hide=false;
    password=""
    passwordConfirm=""
    hideConfirm=false;
    formGroup=this._formBuilder.group({
      "nombreCtrl": new FormControl(['', [Validators.required]]),
      "localidadCtrl":  new FormControl(['', [Validators.required]]),
      "direccionCtrl": new FormControl(['', [Validators.required]]),
      "passwordCtrl": new FormControl(['', [Validators.required]]),
      "confirmpasswordCtrl":  new FormControl(['', [Validators.required]]),
    })
    ngOnInit(): void {
      this.emp=this.data.empresa
    this.ArrayProvincias()
    this.provselect=this.data.empresa.provincias.id
    console.log(this.data.empresa)
  }

  ArrayProvincias() {
    this.provincias.getAllProvincias().subscribe((resp) => {
      resp.forEach((provincia) => {
        this.prov.push(provincia);
      });
    });
  }
  cambiarPerfil(){
    if(this.formGroup.valid){
      if(this.password==this.passwordConfirm){
        console.log(this.data.empresa)
        this.data.empresa.contrasena=this.password
        this.service.actualizarEmpresa(this.data.empresa).subscribe(data=>{
          this.dialogRef.close()
          this._snackBar.open('Perfil editado Correctamente', 'cerrar', {
            duration: 3000,
          });
        })
      }else{
        this._snackBar.open('No coincide las contraseñas', 'cerrar', {
          duration: 3000,
        });
      }
    }else{
      this._snackBar.open('Rellene los huecos', 'cerrar', {
        duration: 3000,
      });
    }
  }


}
