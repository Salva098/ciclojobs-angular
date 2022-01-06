import { EmpresaService } from './../_servicies/empresa.service';
import { ofertacreate, ofertas } from './../_models/oferta';
import { CicloService } from './../_servicies/ciclo.service';
import { ciclo } from './../_models/ciclo';
  import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component,OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';



@Component({
  selector: 'app-crearoferta',
  templateUrl: './crearoferta.component.html',
  styleUrls: ['./crearoferta.component.css']
})
export class CrearofertaComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  nombre!: string;
  remuneracion!:number;
  descripcion!:string;
  horario!:string;
  fecha_inicio!:Date;
  fecha_fin!:Date;
  ciclolista:ciclo[]=[]





  constructor(private _formBuilder: FormBuilder, private ciclo: CicloService, private empresa:EmpresaService) { 
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );

  }
  CicloCtrl = new FormControl();

  separatorKeysCodes = [ENTER, COMMA];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  todayDate:Date = new Date();
  
  ngOnInit(): void {

    this.ciclo.getAllCiclos().subscribe((data)=>{
      this.ciclolista=data
      data.forEach(element => {
        this.allFruits.push(element.nombre+" - "+element.tipoCiclo.nombre+" - "+ element.familia.nombre)
      });

    })
    


    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      descCtrl: ['', Validators.required],
      numeroCtrl:['',  Validators.compose([Validators.required, Validators.minLength(12)])],
      
    });
    this.secondFormGroup = this._formBuilder.group({

      horarioCtrl:['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      courseIds:this.fruitCtrl
    });
  
  }
sumit(){
  const ids:any[]=[]
this.fruits.forEach(elemento=>{
  const cicloabuscar=elemento.split(' - ')
  this.ciclolista.forEach(c=>{
    if(cicloabuscar[0]==c.nombre&&cicloabuscar[1]==c.tipoCiclo.nombre&&cicloabuscar[2]==c.familia.nombre){
      ids.push({"id":c.id})
    } 
  })
})



  let oferta:ofertacreate={
    nombre: this.nombre,
    descripcion: this.descripcion,
    remuneracion: this.remuneracion,
    fecha_inicio: JSON.stringify(new Date(this.range.value["start"])).replace("\"","").replace("\"",""),
    fecha_fin:  JSON.stringify(new Date(this.range.value["end"])).replace("\"","").replace("\"",""),
    idempresas: parseInt(sessionStorage.getItem('id')!),
    horario: this.horario,
    ciclo:ids
  }   
  console.log(oferta)
  this.empresa.addOfertaEmpresa(oferta).subscribe(element=>{
    console.log("hecho")
  })
}


  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [];
  
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;



  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.allFruits.forEach(element => {
      if(element==value){
      // Add our fruit
      if (value) {
        this.fruits.push(value);
        
      }
  
      
      // Clear the input value
      event.chipInput!.clear();
      this.fruitCtrl.setValue(null);
      
    }
  });
}

remove(fruit: string): void {
  const index = this.fruits.indexOf(fruit);
  
  if (index >= 0) {
    this.fruits.splice(index, 1);
  }
  console.log (this.fruits)
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    let ciclosnoseleccionado=this.allFruits.filter(elemento => this.fruits.indexOf(elemento) == -1);
    return ciclosnoseleccionado.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}

