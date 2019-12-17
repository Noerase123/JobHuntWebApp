const mongoose = require('mongoose')
const JobHeaderModel = require('../models/JobHeaderModel')
const JobInfoModel = require('../models/JobInfoModel')
const JobBenefits = require('../models/JobBenefitsModel')
const JobSummary = require('../models/JobSummaryModel')

exports.viewJobs = async (req, res, next) => {
    const id = req.params.jobid
    
    const header = await JobHeaderModel.findById(id,{__v:0})
    const info = await JobInfoModel.findOne({jobId: id}, {__v: 0, _id: 0, jobId: 0})
    const benefits = await JobBenefits.findOne({jobId: id}, {__v: 0, _id: 0, jobId: 0})
    const summary = await JobSummary.findOne({jobId: id}, {__v: 0, _id: 0, jobId: 0})

    const head = {
        datePosted: header.datePosted,
        jobTitle: header.jobTitle,
        company: header.company,
        location: header.location,
        salary: header.salary,
        fullTime: header.fullTime
    }

    try {
        res.status(200).json({
            Job: {
                id: header._id,
                header: head,
                JobInfo: info,
                JobBenefits: benefits,
                JobSummary: summary
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
    
}

exports.viewAll = async (req, res, next) => {
    const All = await JobHeaderModel.find({}, { __v: 0 })

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
    const getbyId = await JobHeaderModel.findById(id)

    try {
        res.status(200).json(getbyId)
    } catch (err) {
        res.status(500).json({ error: err })
        console.log(JSON.parse(err))
    }
}

exports.addJobHeader = async (req, res, next) => {
    const appli = new JobHeaderModel({
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        location: req.body.location,
        salary: req.body.salary,
        fullTime: req.body.fullTime
    })

    await appli.save()
    try {
        res.status(201).json({
            message: 'Job added'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.updateJobHeader = async (req, res, next) => {
    const id = req.params.id
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    await JobHeaderModel.update({ _id: id }, { $set: updateOps })
    try {
        res.status(200).json({
            message: 'Job updated'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.deleteJobHeader = async (req, res, next) => {
    const id = req.params.id
    await JobHeaderModel.deleteOne({ _id: id })
    try {
        res.status(200).json({
            message: `(${id}) Job deleted`
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
}