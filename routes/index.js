const express = require("express");
const router = express.Router();
var user = require("../middleware/user.middleware");
router.route('/')
    .get(function (req, res) {
        res.render('index');
    })
    .post(user.postUser);

router.route('/canvas')
    .get(function(req, res) {
        res.render('canvas');
    })

module.exports = router;