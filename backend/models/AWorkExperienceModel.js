const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workExp = new Schema({
    applicantId: {type:String},
    jobTitle: {type:String},
    company: {type:String},
    from: {type:Date},
    to: {type:Date},
    current: {type:Boolean},
    description: {type:String}
})

module.exports = mongoose.model('workExperience', workExp)