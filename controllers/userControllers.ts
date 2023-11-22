
import * as mongoDB from "mongodb";
import { log } from 'console';
import { Admin } from '../models/user';
import * as userFunctions from '../utilities/DataBaseFunctions/userFunctions'
import { ConvertColectionToAdmins } from "../utilities/DataBaseFunctions/DBFunctions";
import { dbPromise } from "../utilities/DataBaseFunctions/DBFunctions";
/*
RENOMBRAR A ADMINS
*/
export default {
    getAdmins:async (_req,_res)=> {
        _res.status(200).send( await ConvertColectionToAdmins(await dbPromise) )
    }
    
}  