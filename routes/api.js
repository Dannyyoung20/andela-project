let express = require('express');
router = express.Router();
let userController = require('../middleware/user.middleware');

router.route('/').get(function (req, res) { res.send('You hit the api route'); });
router.route('/users').get(userController.getUsers)
router.get('/user/profile/:id', userController.getUserById);
router.get('/user/profile/delete/:id', function (req, res) {res.render('delete', {id: req.params.id})} );
router.route('/create-user')
    .get(function (req, res) {
        res.render('create');
    })
    .post(userController.postUser);

router.post('/user/profile/:id', userController.updateUser);
router.get('/user/profile/delete/user/:id', userController.deleteUser);


module.exports = router;