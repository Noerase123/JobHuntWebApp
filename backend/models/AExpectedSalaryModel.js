const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expectedSalary = new Schema({
    applicantId: {type:String},
    minimum: {type:Number},
    maximum: {type:Number},
    currency: {type:String},
    frequency: {type:String}
})

module.exports = mongoose.model('expectedSalary', expectedSalary)