import { StripeService } from './../_servicies/stripe.service';
import { EmpresaService } from './../_servicies/empresa.service';

import {Component, Inject,OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-premium-dialog',
  templateUrl: './premium-dialog.component.html',
  styleUrls: ['./premium-dialog.component.css']
})
export class PremiumDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PremiumDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private empresa:EmpresaService,
    private stripe:StripeService) { }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close();
  }
  crearsub(){
    this.empresa.getEmpresaid().subscribe((data)=>{ 
      this.stripe.generarUrlPago(data).subscribe((url)=>{
        window.location.href=url
      })
    });
  }

}
