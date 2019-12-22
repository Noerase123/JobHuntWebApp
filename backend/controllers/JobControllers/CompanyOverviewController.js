const mongoose = require('mongoose')
const CompanyOverviewModel = require('../../models/CompanyOverviewModel')

exports.viewAll = async (req, res, next) => {
    const All = await CompanyOverviewModel.find({}, { __v: 0 })

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
    const jobid = req.params.jobid
    const getJobid = await CompanyOverviewModel.find({ jobId: jobid })

    try {
        res.status(200).json(getJobid)
    } catch (err) {
        res.status(500).json(err)
        console.log(JSON.parse(err))
    }
}

exports.addComOverview = async (req, res, next) => {
    const appli = new CompanyOverviewModel({
        jobId: req.params.jobid,
        overview: req.body.overview,
        yearStarted: req.body.yearStarted
    })

    await appli.save()
    try {
        res.status(201).json({
            message: 'Company Overview added'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.updateComOverview = async (req, res, next) => {
    const id = req.params.jobid
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    await CompanyOverviewModel.update({ jobId: id }, { $set: updateOps })
    try {
        res.status(200).json({
            message: 'Company Overview updated'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.deleteComOverview = async (req, res, next) => {
    const id = req.params.jobid
    await CompanyOverviewModel.deleteOne({ jobId: id })
    try {
        res.status(200).json({
            message: `(${id}) Company Overview deleted`
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
}