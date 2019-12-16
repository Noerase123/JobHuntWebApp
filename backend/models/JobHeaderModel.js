const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JobHeader = new Schema({
    jobTitle: {type:String, required: true},
    company: {type:String, required: true},
    location: {type:String, required: true},
    salary: {type:Number, required: true},
    fullTime: {type:Boolean},
    datePosted: {type:Date, default:Date.now()}
})

module.exports = mongoose.model('jobheader', JobHeader)