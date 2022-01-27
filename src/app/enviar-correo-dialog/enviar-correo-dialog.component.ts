import { EmpresaService } from './../_servicies/empresa.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enviar-correo-dialog',
  templateUrl: './enviar-correo-dialog.component.html',
  styleUrls: ['./enviar-correo-dialog.component.css']
})
export class EnviarCorreoDialogComponent implements OnInit {
  formGroup= this._formBuilder.group({
  
    mensajectrl:["",[Validators.required]]
    
  })
  mensaje=""

  constructor(public dialogRef: MatDialogRef<EnviarCorreoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private service:EmpresaService,
    private _snackBar: MatSnackBar){ }


  enviarcorreo(){
    if(this.formGroup.valid){
      this.service.sendEmailAlumno(this.data.emailalumno,this.data.nombreoferta,this.mensaje).subscribe(data=>{
        this._snackBar.open("Email enviado", "cerrar",{
          duration: 3000,
        })
        this.dialogRef.close()

      })
    }
  }

  ngOnInit(): void {
    
  }

}
