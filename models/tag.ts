

export class tag{
    nombre: String;
    finales: Array<string>;
    subsecciones: Array<tag>;

    constructor(inNombre: String, inFinales: Array<string>,inSubsecciones:Array<tag>){
        this.nombre = inNombre;  this.subsecciones=inSubsecciones;this.finales=inFinales;
    }
}