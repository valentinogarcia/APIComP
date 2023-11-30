import express, { Application } from "express"
import userController from "../controllers/userControllers"  

export function UserRoutes(app:Application){
    app.get('/admins', userController.getAdmins)
    app.delete('/admins/:id',userController.deleteAdmin)
    app.post('/admins',userController.addAdmin)
    app.put('/admins',userController.updateAdmin)
}