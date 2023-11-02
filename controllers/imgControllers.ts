import {dbPromise,UploadIMG,DB_CONN_STRING,DB_NAME,COLLECTION_NAME_ELEMENTOS,ConvertColectionToElemento,ConvertDocumentToElemento,getElemento,findElemento,collections} from '../utilities/DataBaseFunctions/DBFunctions'
import { elemento } from '../models/elemento';
export default{
    SaveImage: (async (_req,_res)=> { 
        console.log(_req);
        
        UploadIMG(_req,_res)
    })
}