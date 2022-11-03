const mongoose = require('mongoose');

const Users = mongoose.model('Users', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0 
    }

})

module.exports = Users;