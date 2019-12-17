const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSummary = new Schema({
    jobId: {type:String, required:true},
    jobLevel: {type: Number},
    industry: {type: String},
    jobCategory: {type: String},
    vacancy: {type: Number},
    education: {type: Number},
    website: {type:String},
    responseAccuracy: {type:String},
    officeAddress: {type:String}
})

module.exports = mongoose.model('jobSummary', jobSummary)