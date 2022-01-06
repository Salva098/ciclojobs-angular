import { ciclo } from "./ciclo";
import { provincia } from "./provincias";

export interface Alumnos{
    id:number,
    nombre:string,
    email:string,
    apellidos:string,
    fechanacimiento:string,
    idprovincias:number,
    provincia:provincia,
    localidad:string,
    id_ciclo:number,
    ciclo:ciclo,
    calificacion_media:number,
    foto:string

}