import { EditarPerfilDialogComponent } from './../editar-perfil-dialog/editar-perfil-dialog.component';
import { empresa } from './../_models/empresa';
import { provincia } from '../_models/provincias';
import { EmpresaService } from './../_servicies/empresa.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  emp!:empresa;
  provincia:String|undefined="";
  constructor(private empresa:EmpresaService, private dialog: MatDialog) {

  }
  
  ngOnInit(): void {
    this.obtenerPerfil();
  }
  editarPerfil(){
    const a =this.dialog.open(EditarPerfilDialogComponent,{
      data:{
        "empresa":this.emp
      }
    })
    a.afterClosed().subscribe(data=>{
      this.obtenerPerfil()
    })
   
  }
  
  obtenerPerfil(){
 
    this.empresa.getEmpresaid().subscribe((data)=>{ 
      this.emp=data
      this.provincia=data.provincias?.provincias
      console.log(this.emp)
    });
  
  }
}
