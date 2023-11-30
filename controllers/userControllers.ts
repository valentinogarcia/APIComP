
import * as mongoDB from "mongodb";
import { log } from 'console';
import { Admin } from '../models/user';
import * as userFunctions from '../utilities/DataBaseFunctions/userFunctions'
import { ConvertColectionToAdmins, collections } from "../utilities/DataBaseFunctions/DBFunctions";
import { dbPromise } from "../utilities/DataBaseFunctions/DBFunctions";
/*
RENOMBRAR A ADMINS
*/
export default {
    getAdmins:async (_req,_res)=> {
        _res.status(200).send( await ConvertColectionToAdmins(await dbPromise) )
    },
    addAdmin:(async (_req,_res) => { 
        try {
          console.log("no bitches")
          const newAdmin = _req.body as Admin;
          if(!newAdmin.mail){return _res.status(400).send("Debe tener un nombre")}
          //if(!newAdmin.Admin && !newAdmin.finales){return _res.status(400).send("Debe tener Admin o finales")}
          console.log(newAdmin)
          const existeAdmin = await collections.usuarios?.findOne({ nombre: newAdmin.mail });
          console.log("wat")
          if(existeAdmin){ return _res.status(400).send("Ya existe (leto no podemos poner eso)") }
          const r = await collections.usuarios?.insertOne(newAdmin);
          r
              ? _res.status(201).send(`Se creo yei ${r.insertedId}`)
              : _res.status(500).send("Que haces? GAAAAA");
      } catch (error) {
          _res.status(400).send("hola");
      }
    }),

    updateAdmin:(async (_req, _res) => {
        try {
            const tag = _req.body as Admin
            //const _id= new mongoDB.ObjectId(_req.params.tag)
            if(!tag.mail){return _res.status(400).send("Necesita un nombre")}
            //if(!tag.finales&&!tag.Admin){return _res.status(400).send("Necesita finales o Admin")}
            console.log(tag);
            
            collections.usuarios?.findOneAndReplace( {mail:tag.mail} , tag)
            return _res.status(200).send("mando may guey")
        } catch (error) {
            _res.status(400).send("el que dice error es puto");
        }
    }),
    
    deleteAdmin:(async (_req, _res) => {
      console.log(_req.params.id);
      
        try {
          if(!_req.params.id){_res.status(400).send("no id")}
          console.log(_req.params.id);
          const r = await collections.usuarios?.deleteOne( { mail:_req.params.id} );
      
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