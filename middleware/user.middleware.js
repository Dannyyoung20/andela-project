const User = require('../models/users.model.server');

module.exports = {
    postUser: (req, res) => {
        if(req.body) {
            // Validate the body request
            req.check('firstname', 'Firstname is required').notEmpty();
            req.check('lastname', 'Lastname is required').notEmpty();
            req.check('email', 'Email is required').notEmpty();
            req.check('email', 'Invalid Email').isEmail();
            req.check('department', 'Department filed is required').notEmpty();
            // Check if a file is about to be uploaded
            user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                department: req.body.department,
                phone: req.body.phone
            })

            if(user) {
                user.save(err => {
                    if (err) throw err;
                    res.redirect('/api/users');
                });
            }
        }
    },

    getUsers: (req, res) => {
        User.find({}, function(err, data) {
            if (err) throw err;
            console.log(data);
            res.render('user', { 'users': data });
        });
    },

    getUserById: function(req, res) {
        User.findOne({_id: req.params.id}, function(err, user) {
            if (err) throw err;
            
            res.render('profile', {user: user});
        });
    }
}