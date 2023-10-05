import express from "express"
import tagController from "../controllers/tagControllers"  
import { auth } from "../utilities/DataBaseFunctions/auth";

//export const paisesRouter = express()

export function tagRoutes(app){
    app.get('/tags', /*auth,*/tagController.getTags);
    app.get('/tags/:tag', tagController.getTag);
    app.post('/tags',/*auth,*/ tagController.addTag);
    app.put('/tags/:tag',/*auth,*/ tagController.updateTag);
    app.delete('/tags', /*auth,*/tagController.deleteTag);
}