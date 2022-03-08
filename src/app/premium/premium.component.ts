import { PremiumMensajeComponent } from './../premium-mensaje/premium-mensaje.component';
import { ProvinciaService } from './../_servicies/provincias.service';
import { provincia } from './../_models/provincias';
import { ciclo } from './../_models/ciclo';
import { CicloService } from './../_servicies/ciclo.service';
import { AlumnoService } from './../_servicies/alumnos.service';
import { Router } from '@angular/router';
import { StripeService } from './../_servicies/stripe.service';
import { Component, OnInit } from '@angular/core';
import { Alumnos } from '../_models/alumno';
import { familiaprofe } from '../_models/familiaProfesional';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css'],
})
export class PremiumComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private stripe: StripeService,
    private alumnos: AlumnoService,
    private route: Router,
    private ciclos: CicloService,
    private provincias: ProvinciaService
  ) {}

  formatfecha(fecha: String): string {
    return fecha.split('T')[0];
  }
  listAlumnos: Alumnos[] = [];

  cicloid = 0;
  provinciaid = 0;
  fplist: familiaprofe[] = [];
  ciclolist: ciclo[] = [];
  provincialist: provincia[] = [];

  ngOnInit(): void {
    this.stripe.existPremium().subscribe(
      (_) => {
        this.alumnos.GetAll().subscribe((alumnos) => {
          this.listAlumnos = alumnos;
        });
      },
      (error) => {
        this.route.navigate(['home']);
      }
    );
    this.ciclos.getAllCiclos().subscribe((data) => {
      this.ciclolist = data;
    });
    this.provincias.getAllProvincias().subscribe((data) => {
      this.provincialist = data;
    });
  }
  filtro() {
    if (this.cicloid == 0 && this.provinciaid != 0) {
      return this.listAlumnos.filter((u) => u.idprovincias == this.provinciaid);
    } else if (this.cicloid != 0 && this.provinciaid == 0) {
      return this.listAlumnos.filter((u) => u.ciclo.id == this.cicloid);
    } else if (this.cicloid != 0 && this.provinciaid != 0) {
      return this.listAlumnos.filter((u) => u.ciclo.id == this.cicloid&& u.idprovincias == this.provinciaid);
    } else {
      return this.listAlumnos
    }
  }
  

  enviarmensaje(idalumno:number){
    this.dialog.open(PremiumMensajeComponent,{
      data:{
        "id":idalumno
      }
    })

  }
}
