let express = require('express');
router = express.Router();

router.route('/')
    .get(function(req, res) {
        res.send('You hit the api route');
    });

router.route('/user')
    .get(function(req, res) {

    })
    .post(function(req, res) {

    });

module.exports = router;