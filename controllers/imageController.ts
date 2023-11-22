import multer from "multer";
var path = require('path')
const storage = multer.diskStorage(
    {
        destination: (_req,file,cb)=>{
            cb(null,'./images')
        },
        filename: function (_req,file,cb){
            console.log(_req.file);
            try{

                console.log(file.originalname.split('.'));
                if(file.mimetype.split('/')[0] != 'image'){ ;
                    const aux = file.originalname.split('.');
                    if(aux[aux.length-1]!='jfif'){
                        
                        return;
                    }
                }
                cb(null,Date.now()+path.extname(file.originalname))
            }catch{
                console.log("error");
                
            }
        }
    }
)
export const uploadMiddleWare = multer({storage:storage})
export default {
    uploadImage: (async (_req,_res)=> {   
        try{

            console.log(_req.file);
            _res.json({
                success:1,
                imageURL:  `http://localhost:3030/images/uploads/${_req.file.filename}`
            })
            
        }catch{

        }
        })
}
