import { InscripcionService } from './../_servicies/inscripciones.service';
import { CrearofertaComponent } from './../crearoferta/crearoferta.component';
import { ciclo } from './../_models/ciclo';
import { ofertas } from './../_models/oferta';
import { EmpresaService } from './../_servicies/empresa.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Inscripciones } from '../_models/inscripciones';
import { Alumnos } from '../_models/alumno';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
ofertasList:ofertas[]=[]
InscripcionesList:Inscripciones[]=[]
selected=""

formatfecha(fecha:String):string{   

return fecha.split('T')[0]; 
}

  constructor(private empre:EmpresaService, private dialog: MatDialog,private inscripciones:InscripcionService, private _snackBar: MatSnackBar) { }


  openDialog() {

    const a =this.dialog.open(CrearofertaComponent,{
      width: '70%',
    });
    a.afterClosed().subscribe(_datos=>{
      this.getOfertasList()
      this.getInscripcionesList()
    })
}

  ngOnInit(): void {
    this.getOfertasList()
    this.getInscripcionesList()
  } 
  getOfertasList(){
    this.empre.getOfertasEmpresa().subscribe((data)=>{
      this.ofertasList=data
      console.log(this.ofertasList)
    })
  }
  getInscripcionesList(){
    this.inscripciones.getInscripciones().subscribe((data)=>{
      this.InscripcionesList=data
    })
  }
  getInscipcionesOfertas(idoferta:number|undefined):Array<Inscripciones>{

    return this.InscripcionesList.filter(inscrioncion=>inscrioncion.ofertaId==idoferta);
  }
  cambiarestado(_event: any,_inscripcion:Inscripciones){
    _inscripcion.estadoInscripcion=_event.value
    this.inscripciones.updateIncripcion(_inscripcion).subscribe((data)=>{
      this._snackBar.open("Inscipcion cambiado correctamente","cerrar",
      {
      duration: 3000,
    })
    },error=>{
      this._snackBar.open("ERROR: Inscipcion no cambiada","cerrar",
      {
      duration: 3000,
    })
    });
    
  }

}
