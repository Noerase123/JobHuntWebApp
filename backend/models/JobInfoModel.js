const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JobHeader = new Schema({
    jobId: {type:String, required: true},
    jobDescription: {type:String},
    qualification: {type:String}
})

module.exports = mongoose.model('jobInfo', JobHeader)