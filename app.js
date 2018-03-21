const express = require('express');
const multer = require('multer');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Image = require('./models/image');
mongoose.connect('mongodb://aayush:aayush@ds111059.mlab.com:11059/schoolshop');
//Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
//Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('myImage');


//Checkfile type
function checkFileType(file, cb) {
    const filetypes = /jpeg|png|jpg|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error :Images only')
    }
}

const app = express();

//EJS
app.set('view engine', 'ejs');

//public
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            if (req.file == undefined) {
                res.json({ suceess: true, msg: 'No file selected' });
            } else {
                res.json({ success: true, msg: 'Image uploaded' });
            }
        }
    })
})
app.listen(3000, () => {
    console.log('server running on port 3000');
});
