
import * as mongoDB from "mongodb";
import { elemento} from '../../models/elemento';
import { Subsecciones } from "../../models/Subsecciones";
import { Admin } from "../../models/user";
import dotenv from 'dotenv'
import { usuarios } from "./userFunctions";
dotenv.config()
export const DB_CONN_STRING=process.env.DB_CONN_STRING
export const DB_NAME=process.env.DB_NAME
export const COLLECTION_NAME_ELEMENTOS=process.env.COLLECTION_NAME_ELEMENTOS
export const COLLECTION_NAME_TAGS=process.env.COLLECTION_NAME_TAGS
export const COLLECTION_NAME_ADMINS=process.env.COLLECTION_NAME_ADMINS
export const COLLECTION_NAME_IMG=process.env.COLLECTION_NAME_IMG


export const collections: { elementos?: mongoDB.Collection,tags?:mongoDB.Collection,usuarios?:mongoDB.Collection } = {}

export async function findElemento(elementos:elemento[],target:string) {
  return elementos.find( (elemento)=> elemento.nombre.toLowerCase() === target.toLocaleLowerCase() )
}

export async function ConvertColectionToElemento(db:mongoDB.Db): Promise<elemento[]> {
  const col = await db.collection(COLLECTION_NAME_ELEMENTOS).find().toArray();
  let elementos:elemento[]=[]
  col.forEach( (obj)=>{ const element:elemento = new elemento(obj.nombre,obj.tags,obj.stats,obj.img,obj._id);elementos.push(element) } )
  return elementos
}
export async function ConvertColectionToAdmins(db:mongoDB.Db): Promise<Admin[]> {
  const col = await db.collection(COLLECTION_NAME_ADMINS).find().toArray();
  let admins:Admin[]=[]
  col.forEach( (obj)=>{ const a:Admin = new Admin(obj.mail,obj.superAdmin);admins.push(a) } )
  return admins
}
export async function ConvertColectionToTag(db:mongoDB.Db): Promise<Subsecciones[]> {
  const col = await db.collection(COLLECTION_NAME_TAGS).find().toArray();
  let tags:Subsecciones[]=[]
  col.forEach( (obj)=>{ const element:Subsecciones = new Subsecciones(obj.nombre,obj.finales,obj.subsecciones,obj._id);tags.push(element) } )
  return tags
}
export async function ConvertDocumentToElemento(document:mongoDB.WithId<mongoDB.BSON.Document>) :Promise<elemento>{
  let element:elemento = new elemento( document.nombre,document.tags,document.stats,document.img,document._id )
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
  collections.usuarios=db.collection(COLLECTION_NAME_ADMINS);
    collections.usuarios.insertOne( new Admin("admin@gmail.com",true) )
       
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${elementosCollection.collectionName}`);
  return db;
}
  
export const dbPromise =  connectToDatabase()
