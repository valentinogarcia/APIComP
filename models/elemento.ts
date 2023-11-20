import { ObjectId } from "mongodb";
import { tag } from "./tag";

export class elemento{
    nombre: String;
    tags: Array<tag>;
    stats: JSON;
    _id:ObjectId;

    constructor(inNombre: String, inTags: Array<tag>,inStats:JSON,_id:ObjectId|string|null){
        this.nombre = inNombre; this.tags = inTags ; this.stats=inStats;if(typeof(_id)=="string"){this._id=new ObjectId(_id)}else{;this._id=_id;}
    }
}