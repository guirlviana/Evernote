const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    created_at: { type: Date, default: Date.now },
    updated_at: {type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema);