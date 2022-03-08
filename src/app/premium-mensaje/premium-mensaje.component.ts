import { mensaje } from './../_models/mensaje';
import { MensajeService } from './../_servicies/mensaje.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-premium-mensaje',
  templateUrl: './premium-mensaje.component.html',
  styleUrls: ['./premium-mensaje.component.css']
})
export class PremiumMensajeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PremiumMensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private mensajeservice:MensajeService) { }
  formGroup=this._formBuilder.group({
  
    mensajectrl:["",[Validators.required]]
    
  })
  msg=""
  ngOnInit(): void {
  }
  enviarMensaje(){
    let menajeenv:mensaje={
      alumnoid: this.data.id,
      mensaje: this.msg
    }
    this.mensajeservice.EnviarMensaje(menajeenv).subscribe((_)=>{
      this.dialogRef.close()


    })
  }

}
