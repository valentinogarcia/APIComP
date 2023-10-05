import { Subsecciones } from "./Subsecciones";

export class tag{
    nombre: String;
    subsecciones: Array<Subsecciones>;

    constructor(inNombre: String,inSubsecciones:Array<Subsecciones>){
        this.nombre = inNombre;  this.subsecciones=inSubsecciones;
    }
}