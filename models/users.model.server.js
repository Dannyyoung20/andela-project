const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    profile_pic: String,
    department: {
        required: true,
        type: String
    },
    created_at: new Date()
});

var User = mongoose.model('Users', userSchema);


module.exports = User;