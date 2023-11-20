import express from "express"
import elementoControllers from "../controllers/elementoControllers"  
import { auth } from "../utilities/DataBaseFunctions/auth";

//export const paisesRouter = express()

export function paisRoutes(app){
    app.get('/elementos', /*auth,*/elementoControllers.getElementos);
    app.get('/elementos/:elemento', elementoControllers.getElemento);
    app.post('/elementos',/*auth,*/ elementoControllers.addElemento);
    app.put('/elementos/:elemento',/*auth,*/ elementoControllers.updateElemento);
    app.patch('/elementos/:elemento',/*auth,*/ elementoControllers.changeElemento);
    app.delete('/elementos/:_id', /*auth,*/elementoControllers.deleteElemento);
}