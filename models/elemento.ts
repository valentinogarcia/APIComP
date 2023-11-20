import { ObjectId } from "mongodb";
import { tag } from "./tag";

export class elemento{
    nombre: String;
    img:String;
    tags: Array<tag>;
    stats: JSON;
    _id:ObjectId;

    constructor(inNombre: String, inTags: Array<tag>,inStats:JSON,img:String,_id:ObjectId|string|null){
        this.nombre = inNombre; this.tags = inTags ; this.stats=inStats;this.img=img;if(typeof(_id)=="string"){this._id=new ObjectId(_id)}else{;this._id=_id;}
    }
}