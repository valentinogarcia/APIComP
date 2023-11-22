import imageController from "../controllers/imageController";
import { Application } from "express";
import { uploadMiddleWare } from "../controllers/imageController";
import express from "express";
export function imageRoutes(app:Application){
    app.post( '/images',uploadMiddleWare.single('image'),imageController.uploadImage) 
}