const express = require("express");
const router = express.Router();
const multer = require('multer');
var user = require("../middleware/user.middleware");

const multerConf = {
    storage: multer.diskStorage({
        destination: function(req, file, next) {
            next(null, 'public/uploads');
        },
        filename: function(req, file, next) {
            const ext = file.mimetype.split('/')[1];
            next(null, file.filename + '_'+ Date.now()+ '.'+ext);
        }
    }),
    fileFilter: function(req, file, next) {
        if(!file) {
            next();
        }
        const image = file.mimetype.startWith('image/');
        if(image){
            next(null, true);
        }else{
            next({message: 'File not supported'}, false);
        }
    }
}

router.route('/')
    .get(function (req, res) {
        res.render('index');
    })
    .post(multer(multerConf).single('photo'),user.postUser);

router.route('/canvas')
    .get(function (req, res) {
        res.render('canvas');
    })

module.exports = router;