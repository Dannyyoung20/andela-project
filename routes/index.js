const express = require("express");
const router = express.Router();
const multer = require('multer');
var user = require("../middleware/user.middleware");

router.route('/')
    .get(function (req, res) {
        res.render('index');
    });

router.route('/canvas')
    .get(function (req, res) {
        res.render('canvas');
    })

module.exports = router;