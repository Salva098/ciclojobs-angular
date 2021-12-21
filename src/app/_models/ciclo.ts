import { familiaprofe } from "./familiaProfesional";
import { tipociclo } from "./tipociclo";

export interface ciclo{
    id:number;
    nombre:string;
    idfamiliaprofe:number;
    familia:familiaprofe;
    idtipo:number;
    tipoCiclo:tipociclo;
}