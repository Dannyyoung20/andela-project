let express = require('express');
router = express.Router();

router.route('/')
    .get(function (req, res) {
        res.send('You hit the api route');
    });

router.route('/users')
    .get(function (req, res) {
        res.render('user');
    })
    .post(function (req, res) {

    });

router.get('/user/profile/:id', function (req, res) {
    res.render('profile');
});

router.route('/create-user')
    .get(function (req, res) {
        res.render('user');
    })
    .post(function (req, res) {
        res.send('Posted');
    })

module.exports = router;