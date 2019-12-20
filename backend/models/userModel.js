const mongoose = require('mongoose')
const Schema = mongoose.Schema

const users = new Schema({
    username: {type:String, required: true},
    password: {type:String, required:true},
    ipCreated: {type:String}
})

module.exports = mongoose.model('users', users)