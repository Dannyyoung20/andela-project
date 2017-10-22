const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    department: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
});

var User = mongoose.model('Users', userSchema);


module.exports = User;