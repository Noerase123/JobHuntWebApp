const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicantSchema = new Schema({
    firstname: {type:String},
    lastname: {type: String},
    location: {type: String},
    contactNo: {type: String},
    email: {type: String},
    birthday: {type: Date},
    gender: {type: String}
})

module.exports = mongoose.model('applicant', applicantSchema)