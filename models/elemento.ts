import { tag } from "./tag";

export class elemento{
    nombre: String;
    tags: Array<tag>;
    stats: JSON;

    constructor(inNombre: String, inTags: Array<tag>,inStats:JSON){
        this.nombre = inNombre; this.tags = inTags ; this.stats=inStats;
    }
}