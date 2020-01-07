const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicantSchema = new Schema({
    userId: {type:String, required: true},
    firstname: {type:String, required: true},
    lastname: {type: String, required: true},
    location: {type: String, required: true},
    contactNo: {type: Number, required: true},
    email: {type: String, required: true},
    birthday: {type: Date, required: true},
    gender: {type: String, required: true}
})

module.exports = mongoose.model('applicant', applicantSchema)