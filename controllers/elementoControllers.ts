
import {dbPromise,DB_CONN_STRING,DB_NAME,COLLECTION_NAME_ELEMENTOS,ConvertColectionToElemento,ConvertDocumentToElemento,getElemento,findElemento,collections} from '../utilities/DataBaseFunctions/DBFunctions'
import { elemento } from '../models/elemento';
import * as mongoDB from "mongodb";

export default {
    getElementos: (async (_req,_res)=> {   
         _res.status(200).send(await ConvertColectionToElemento(await dbPromise)) 
    }),

    getElemento:(async(_req,_res)=> {
      let _id:mongoDB.ObjectId=new mongoDB.ObjectId(_req.params.elemento)
      console.log(_id);
      
      const elementos = ConvertColectionToElemento(await dbPromise);
      const elemento = (await elementos).find( (p) => p._id.toString()===_req.params.elemento
       )
      console.log(elemento);
      
       _res.status(200).send(elemento)  
    }),
    
    addElemento:(async (_req,_res) => { 
        try {
          console.log("no bitches")
          const newElemento = _req.body as elemento;
          if(!newElemento.nombre){_res.status(400).send("Necesita un nombre")}
          if(!newElemento.tags){_res.status(400).send("Necesita un tag")}
          console.log(newElemento)
          const existeElemento = await collections.elementos?.findOne({ nombre: newElemento.nombre });
          console.log("wat")
          if(existeElemento){ return _res.status(400).send("Ya existe (leto no podemos poner eso)") }
          const r = await collections.elementos?.insertOne(newElemento);
          r
              ? _res.status(201).send(`Se creo yei ${r.insertedId}`)
              : _res.status(500).send("Que haces? GAAAAA");
      } catch (error) {
          _res.status(400).send("hola");
      }
    }),

    updateElemento:(async (_req, _res) => {
      console.log("bruh");
      
        try {
            const elemento = _req.body as elemento
            if(!elemento.nombre){_res.status(400).send("Necesita un nombre")}
            if(!elemento.tags){_res.status(400).send("Necesita un tag")}
            console.log(elemento);
            
            collections.elementos?.findOneAndReplace( {_id:new mongoDB.ObjectId(_req.params.elemento)} , elemento)
            return _res.status(200).send("mando may guey")
        } catch (error) {
            _res.status(400).send("el que dice error es puto");
        }
    }),

    changeElemento: (async (_req,_res)=> {
      console.log(_req.body);
      
        try {
          const elemento = _req.body as elemento
          const elementoOriginal = await getElemento( _req.params.elemento )
          
          if( elemento.nombre ){ elementoOriginal.nombre= elemento.nombre }
    
          collections.elementos?.findOneAndReplace( {nombre:_req.params.elemento} , elementoOriginal)
          return _res.status(200).send("mando may guey")
      } catch (error) {
          _res.status(400).send("el que dice error es puto");
      }
    }),
    
    deleteElemento:(async (_req, _res) => {
      console.log(_req.params._id)
        try {
          const r = await collections.elementos?.deleteOne( { _id: new mongoDB.ObjectId(_req.params._id) } );
      
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