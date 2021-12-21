import { CrearofertaComponent } from './../crearoferta/crearoferta.component';
import { ciclo } from './../_models/ciclo';
import { ofertas } from './../_models/oferta';
import { EmpresaService } from './../_servicies/empresa.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
ofertasList:ofertas[]=[]
formatfecha(fecha:String):string{   

return fecha.split('T')[0]; 
}

  constructor(private empre:EmpresaService, private dialog: MatDialog) { }


  openDialog() {

    const a =this.dialog.open(CrearofertaComponent,{
      width: '70%',
    });
    a.afterClosed().subscribe(datos=>{
      this.getOfertasList()
    })
}

  ngOnInit(): void {
    this.getOfertasList()
  } 
  getOfertasList(){
    this.empre.getOfertasEmpresa(sessionStorage.getItem('id')).subscribe((data)=>{
      this.ofertasList=data
      console.log(this.ofertasList)
    })
  }

}
