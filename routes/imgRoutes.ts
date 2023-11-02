import imgControllers from "../controllers/imgControllers"
import elementoControllers from "../controllers/imgControllers"  
import express from "express"
import path from "path";
/*
const storage = multer.diskStorage( { destination:(req,file,cb)=>{
    cb(null,'imgs')
},
filename:(req,file,cb)=>{
    console.log(file);
    cb(null,Date.now()+path.extname(file.originalname))
    
}
} );
const upload = multer({storage:storage})*/
export function ImgRoutes(app:express.Application){
    app.post('/img/',//upload.single('image'),
    imgControllers.SaveImage)
}