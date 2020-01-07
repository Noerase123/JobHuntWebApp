const mongoose = require('mongoose')
const JobSummaryModel = require('../../models/JobSummaryModel')

exports.viewAll = async (req, res, next) => {
    const All = await JobSummaryModel.find({}, { __v: 0 })

    try {
        res.status(200).json({
            data: All
        })
    } catch (err) {
        res.status(500).json({ error: err })
        console.log(JSON.parse(err))
    }

}

exports.viewByJobID = async (req, res, next) => {
    const jobid = req.params.id
    const getJobid = await JobSummaryModel.findById(jobid)

    try {
        res.status(200).json(getJobid)
    } catch (err) {
        res.status(500).json(err)
        console.log(JSON.parse(err))
    }
}

exports.addJobSummary = async (req, res, next) => {
    
    const appli = new JobSummaryModel({
        jobId: req.params.jobid,
        jobLevel: req.body.jobLevel,
        industry: req.body.industry,
        jobCategory: req.body.jobCategory,
        vacancy: req.body.vacancy,
        education: req.body.education,
        website: req.body.website,
        responseAccuracy: req.body.responseAccuracy,
        officeAddress: req.body.officeAddress
    })

    await appli.save()
    try {
        res.status(201).json({
            message: 'Job Summary added'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.updateJobSummary = async (req, res, next) => {
    const id = req.params.jobid
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.key] = ops.value
    }
    await JobSummaryModel.update({ _id: id }, { $set: updateOps })
    try {
        res.status(200).json({
            message: 'Job Summary updated'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.deleteJobSummary = async (req, res, next) => {
    const id = req.params.id
    await JobSummaryModel.findByIdAndDelete(id)
    try {
        res.status(200).json({
            message: `(${id}) Job Summary deleted`
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
}