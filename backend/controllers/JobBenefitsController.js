const mongoose = require('mongoose')
const JobBenefitModel = require('../models/JobBenefitsModel')

exports.viewAll = async (req, res, next) => {
    const All = await JobBenefitModel.find({}, { __v: 0 })

    try {
        res.status(200).json({
            data: All
        })
    } catch (err) {
        res.status(500).json({ error: err })
        console.log(JSON.parse(err))
    }

}

exports.viewbyId = async (req, res, next) => {
    const id = req.params.id
    const getbyId = await JobBenefitModel.findById(id)

    try {
        res.status(200).json(getbyId)
    } catch (err) {
        res.status(500).json({ error: err })
        console.log(JSON.parse(err))
    }
}

exports.viewByJobID = async (req, res, next) => {
    const jobid = req.params.jobid
    const getJobid = await JobBenefitModel.find({ jobId: jobid })

    try {
        res.status(200).json(getJobid)
    } catch (err) {
        res.status(500).json(err)
        console.log(JSON.parse(err))
    }
}

exports.addJobBenefits = async (req, res, next) => {
    const appli = new JobBenefitModel({
        jobId: req.params.jobid,
        flexitime: req.body.flexitime,
        paidHolidays: req.body.paidHolidays,
        paidSickLeave: req.body.paidSickLeave,
        housing: req.body.Housing,
        workFromHome: req.body.workFromHome,
        paidVacationLeave: req.body.paidVacationLeave,
        medicalInsurance: req.body.medicalInsurance,
        freeLunch: req.body.freeLunch
    })

    await appli.save()
    try {
        res.status(201).json({
            message: 'Job Benefits added'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.updateJobBenefits = async (req, res, next) => {
    const id = req.params.jobid
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    await JobBenefitModel.update({ jobId: id }, { $set: updateOps })
    try {
        res.status(200).json({
            message: 'Job Benefits updated'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.deleteJobBenefits = async (req, res, next) => {
    const id = req.params.jobid
    await JobBenefitModel.deleteOne({ jobId: id })
    try {
        res.status(200).json({
            message: `(${id}) Job Benefits deleted`
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
}