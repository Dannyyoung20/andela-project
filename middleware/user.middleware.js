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
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                department: req.body.department
            })

            if(user) {
                user.save(err => {
                    if (err) throw err;
                })
            }
        }
    }
}