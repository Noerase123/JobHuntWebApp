const mongoose = require('mongoose')
const Schema = mongoose.Schema

const educ = new Schema({
    applicantId: {type:String},
    educationAttained: {type:String},
    course: {type:String},
    school: {type:String},
    fromYear: {type:Number},
    graduated: {type:Boolean},
    description: {type:String}
})

module.exports = mongoose.model('education', educ)