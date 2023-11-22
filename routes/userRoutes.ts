import express from "express"
import userController from "../controllers/userControllers"  

export function UserRoutes(app){
    app.get('/admins', userController.getAdmins)
}