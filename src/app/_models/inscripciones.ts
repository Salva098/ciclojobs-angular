import { Alumnos } from "./alumno";
import { ofertas } from "./oferta";

export interface Inscripciones{
    id:number,
    idAlumno:number,
    alumno:Alumnos,
    ofertaId:number,
    oferta:ofertas,
    fechaInscripcion:Date,
    estadoInscripción:string
}