import { provincia } from "./provincias";

export interface empresa{
      id?:number;
      email:string;
      nombre:string;
      contrasena?:string;
      idprovincias:number;
      provincias?:provincia;
      localidad:string;
      direccion:string;
}