const mongoose = require('mongoose')
const Schema = mongoose.Schema

const company = new Schema({
    jobId: {type:String, required: true},
    overview: {type: String},
    yearStarted: {type: Number}
})

module.exports = mongoose.model('companyOverview', company)