
import * as mongoDB from "mongodb";
import { elemento} from '../../models/elemento';
import { tag } from "../../models/tag";
import { Subsecciones } from "../../models/Subsecciones";
export const DB_CONN_STRING="mongodb://127.0.0.1:27017"
export const DB_NAME="Comp"
export const COLLECTION_NAME_ELEMENTOS="elementos"
export const COLLECTION_NAME_TAGS="tags"


export const collections: { elementos?: mongoDB.Collection,tags?:mongoDB.Collection } = {}

export async function findElemento(elementos:elemento[],target:string) {
  return elementos.find( (elemento)=> elemento.nombre.toLowerCase() === target.toLocaleLowerCase() )
}

export async function ConvertColectionToElemento(db:mongoDB.Db): Promise<elemento[]> {
  const col = await db.collection(COLLECTION_NAME_ELEMENTOS).find().toArray();
  let elementos:elemento[]=[]
  col.forEach( (obj)=>{ const element:elemento = new elemento(obj.nombre,obj.tags,obj.stats,obj._id);elementos.push(element) } )
  return elementos
}
export async function ConvertColectionToTag(db:mongoDB.Db): Promise<Subsecciones[]> {
  const col = await db.collection(COLLECTION_NAME_TAGS).find().toArray();
  let tags:Subsecciones[]=[]
  col.forEach( (obj)=>{ const element:Subsecciones = new Subsecciones(obj.nombre,obj.finales,obj.subsecciones,obj._id);tags.push(element) } )
  return tags
}
export async function ConvertDocumentToElemento(document:mongoDB.WithId<mongoDB.BSON.Document>) :Promise<elemento>{
  let element:elemento = new elemento( document.nombre,document.tags,document.stats,document._id )
  return element
}

export async function getElemento(target:string ) {
  const doc = await collections.elementos?.findOne( {nombre: target} )
  let elemento = ConvertDocumentToElemento(doc!)  
  return elemento
}


async function connectToDatabase () {
  // dotenv.config();
  
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);
            
  await client.connect();
    
  const db: mongoDB.Db = client.db(DB_NAME);
  const elementosCollection: mongoDB.Collection = db.collection(COLLECTION_NAME_ELEMENTOS);
  collections.elementos = elementosCollection;
  const tagsCollection: mongoDB.Collection = db.collection(COLLECTION_NAME_TAGS);
  collections.tags=tagsCollection
       
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${elementosCollection.collectionName}`);
  return db;
}
  
export const dbPromise =  connectToDatabase()
