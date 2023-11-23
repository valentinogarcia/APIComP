
import {dbPromise,DB_CONN_STRING,DB_NAME,COLLECTION_NAME_TAGS,ConvertColectionToElemento,ConvertDocumentToElemento,getElemento,findElemento,collections, ConvertColectionToTag} from '../utilities/DataBaseFunctions/DBFunctions'
import { elemento } from '../models/elemento';
import * as mongoDB from "mongodb";
import { log } from 'console';
import { Subsecciones } from '../models/Subsecciones';
export default {
    getTags: (async (_req,_res)=> {   
         _res.status(200).send(await ConvertColectionToTag(await dbPromise)) 
    }),

    getTag:(async(_req,_res)=> {
      const tags = ConvertColectionToTag(await dbPromise);
      const taginho = (await tags).find( (p) => p.nombre === _req.params.tag  )
       _res.status(200).send(elemento)  
    }),
    
    addTag:(async (_req,_res) => { 
        try {
          console.log("no bitches")
          const newTag = _req.body as Subsecciones;
          if(!newTag.nombre){return _res.status(400).send("Debe tener un nombre")}
          if(!newTag.subsecciones){return _res.status(400).send("Debe tener un nombre")}
          console.log(newTag)
          const existeTag = await collections.tags?.findOne({ nombre: newTag.nombre });
          console.log("wat")
          if(existeTag){ return _res.status(400).send("Ya existe (leto no podemos poner eso)") }
          const r = await collections.tags?.insertOne(newTag);
          r
              ? _res.status(201).send(`Se creo yei ${r.insertedId}`)
              : _res.status(500).send("Que haces? GAAAAA");
      } catch (error) {
          _res.status(400).send("hola");
      }
    }),

    updateTag:(async (_req, _res) => {
        try {
            const tag = _req.body as Subsecciones
            const _id= new mongoDB.ObjectId(_req.params.tag)
            console.log(tag);
            
            collections.tags?.findOneAndReplace( {_id:_id} , tag)
            return _res.status(200).send("mando may guey")
        } catch (error) {
            _res.status(400).send("el que dice error es puto");
        }
    }),
    
    deleteTag:(async (_req, _res) => {
      //console.log(_req);
      
        try {
          console.log(_req.params.id);
          
          const r = await collections.tags?.deleteOne( { _id:new mongoDB.ObjectId(_req.params.id)} );
      
          if (r && r.deletedCount) {
            _res.status(202).send(`Se fue a cagar! yei `);
          } else if (!r) {
            _res.status(400).send(`No!!!`);
          } else if (!r.deletedCount) {
            _res.status(404).send(` no existe geniopfsjmerg`);
          }
        } catch (error) {
            _res.status(400).send("error");
        }
    })


}  