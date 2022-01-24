import { ciclo } from './ciclo';
import { empresa } from './empresa';
export interface ofertas{
    id?:number;
    nombre:String;
    descripcion:string;
    remuneracion:number;
    fecha_inicio:String;
    fecha_fin:String;
    horario:String;
    idempresa:number;
    empresa?:empresa;
    ciclo?:Array<ciclo>

  }
  export interface ofertacreate{
    id?:number;
    nombre:String;
    descripcion:string;
    remuneracion:number;
    fecha_inicio:String;
    fecha_fin:String;
    horario:String;
    idempresas?:number;
    empresa?:empresa;
    ciclo?:Array<any>
  }