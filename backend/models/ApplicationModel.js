const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicantSchema = new Schema({
    userId: {type:String, required: true},
    jobId: {type:String, required:true},
    jobTitle: {type:String},
    company: {type:String}
})

module.exports = mongoose.model('application', applicantSchema)