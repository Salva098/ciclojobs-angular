import { InscripcionService } from './../_servicies/inscripciones.service';
import { CrearofertaComponent } from './../crearoferta/crearoferta.component';
import { ciclo } from './../_models/ciclo';
import { ofertas } from './../_models/oferta';
import { EmpresaService } from './../_servicies/empresa.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Inscripciones } from '../_models/inscripciones';
import { Alumnos } from '../_models/alumno';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
ofertasList:ofertas[]=[]
InscripcionesList:Inscripciones[]=[]

formatfecha(fecha:String):string{   

return fecha.split('T')[0]; 
}

  constructor(private empre:EmpresaService, private dialog: MatDialog,private inscripciones:InscripcionService) { }


  openDialog() {

    const a =this.dialog.open(CrearofertaComponent,{
      width: '70%',
    });
    a.afterClosed().subscribe(datos=>{
      this.getOfertasList()
      this.getInscripcionesList()
    })
}

  ngOnInit(): void {
    this.getOfertasList()
    this.getInscripcionesList()
  } 
  getOfertasList(){
    this.empre.getOfertasEmpresa(sessionStorage.getItem('id')).subscribe((data)=>{
      this.ofertasList=data
      console.log(this.ofertasList)
    })
  }
  getInscripcionesList(){
    this.inscripciones.getInscripciones(sessionStorage.getItem('id')).subscribe((data)=>{
      this.InscripcionesList=data
    })
  }
  getInscipcionesOfertas(idoferta:number|undefined):Array<Inscripciones>{
    return this.InscripcionesList.filter(inscrioncion=>inscrioncion.ofertaId==idoferta);
  }

}
