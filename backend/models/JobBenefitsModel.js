const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JobBenefit = new Schema({
    jobId: {type:String, required: true},
    flexitime: {type:Boolean},
    paidHolidays: {type:Boolean},
    paidSickLeave: {type:Boolean},
    Housing: {type:Boolean},
    workFromHome: {type:Boolean},
    paidVacationLeave: {type:Boolean},
    medicalInsurance: {type:Boolean},
    freeLunch: {type:Boolean}
})

module.exports = mongoose.model('jobBenefits', JobBenefit)