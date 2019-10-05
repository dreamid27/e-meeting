let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
});

let user = mongoose.model('User', userSchema);

module.exports = user;
