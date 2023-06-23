const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema =  new Schema({
    username: {type: String, required: true, unique: true, minlength: 3},
    age: {type: Number, min: 18 },
    interests: [{type: String}],
    password: {type: String},
    email: {type: String, required: true, unique: true},
    firstname: {type: String, required: true},
    lastname: {type:String, required:true},
    createdAt:{type:Date, default:Date.now()}
});

module.exports = mongoose.model('User', userSchema);