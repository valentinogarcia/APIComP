export class Subsecciones{
    nombre: String;
    finales: Array<string>;
    subsecciones: Array<Subsecciones>|null;

    constructor(inNombre: String, inFinales: Array<string>,inSubsecciones:Array<Subsecciones>|null){
        this.nombre = inNombre; this.finales = inFinales ; if(inSubsecciones){this.subsecciones=inSubsecciones}else{ this.subsecciones=new Array<Subsecciones>() };
    }
    
}