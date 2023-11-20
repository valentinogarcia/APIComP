import { ObjectId } from "mongodb";

export class Subsecciones{
    nombre: String;
    finales: Array<string>;
    subsecciones: Array<Subsecciones>|null;
    _id:ObjectId;

    constructor(inNombre: String, inFinales: Array<string>,inSubsecciones:Array<Subsecciones>|null,_id:ObjectId|string|null){
        this.nombre = inNombre; this.finales = inFinales ; if(typeof(_id)=="string"){this._id=new ObjectId(_id)}else{;this._id=_id;}if(inSubsecciones){this.subsecciones=inSubsecciones}else{ this.subsecciones=new Array<Subsecciones>() };
    }
    
}