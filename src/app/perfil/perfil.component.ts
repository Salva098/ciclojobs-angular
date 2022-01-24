import { empresa } from './../_models/empresa';
import { provincia } from '../_models/provincias';
import { EmpresaService } from './../_servicies/empresa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  emp!:empresa;
  provincia:String|undefined="";
  constructor(private empresa:EmpresaService) {

  }
  
  ngOnInit(): void {
    this.obtenerPerfil();
  }
  
  obtenerPerfil(){
 
    this.empresa.getEmpresaid().subscribe((data)=>{ 
      this.emp=data
      this.provincia=data.provincias?.provincias
      console.log(data)
    });
  
  }
}
