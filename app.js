const express = require('express');
const multer = require('multer');
const path = require('path');
const ejs = require('ejs');

//Set storage engine
const storage = multer.diskStorage({
    destination:'./public/uploads',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
//Init upload
const upload = multer({
    storage:storage,
    limits:{fileSize:1000000},
    fileFilter:(req,file,cb)=>{
        checkFileType(file,cb);
    }
}).single('myImage');


//Checkfile type
function checkFileType(file,cb){
const filetypes = /jpeg|png|jpg|gif/;
const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
const mimetype = filetypes.test(file.mimetype);
if(mimetype && extname){
    return cb(null,true);
}else{
    cb('Error :Images only')
}
}

const app = express();

//EJS
app.set('view engine','ejs');

//public
app.use(express.static('./public'));

app.get('/',(req,res)=>{
    res.render('index');
});
app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.render('index',{msg:err});
        }
        else{
            if(req.file == undefined){
                res.render('index',{
                    msg:'Error:No file selected'
                });
            }else{
                res.render('index',{
                    msg:'File uploaded'
                });
            }
        }
    })
})
app.listen(3000,()=>{
    console.log('server running on port');
});
