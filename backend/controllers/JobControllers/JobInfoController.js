const mongoose = require('mongoose')
const JobInfoModel = require('../../models/JobInfoModel')

exports.viewAll = async (req, res, next) => {
    const All = await JobInfoModel.find({}, { __v: 0 })

    try {
        res.status(200).json({
            data: All
        })
    } catch (err) {
        res.status(500).json({ error: err })
        console.log(JSON.parse(err))
    }

}

exports.viewByJobID = async (req,res,next) => {
    const jobid = req.params.jobid
    const getJobid = await JobInfoModel.find({jobId: jobid})

    try {
        res.status(200).json(getJobid)
    } catch (err) {
        res.status(500).json(err)
        console.log(JSON.parse(err))
    }
}

exports.addJobInfo = async (req, res, next) => {
    const appli = new JobInfoModel({
        jobId: req.params.jobid,
        jobDescription: req.body.jobDescription,
        qualification: req.body.qualification
    })

    await appli.save()
    try {
        res.status(201).json({
            message: 'Job Info added'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.updateJobInfo = async (req, res, next) => {
    const id = req.params.jobid
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.key] = ops.value
    }
    await JobInfoModel.update({ jobId: id }, { $set: updateOps })
    try {
        res.status(200).json({
            message: 'Job Info updated'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.deleteJobInfo = async (req, res, next) => {
    const id = req.params.jobid
    await JobInfoModel.deleteOne({ jobId: id })
    try {
        res.status(200).json({
            message: `(${id}) Job Info deleted`
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
}