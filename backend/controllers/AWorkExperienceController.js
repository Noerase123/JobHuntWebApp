const mongoose = require('mongoose')
const AWorkExperienceModel = require('../models/AWorkExperienceModel')

module.exports.viewAll = async (req, res, next) => {
    const getAll = await AWorkExperienceModel.find()
    try {
        res.status(200).json({
            data: getAll
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

module.exports.viewbyId = async (req, res, next) => {
    const id = req.params.applicantID
    const getbyid = await AWorkExperienceModel.findById(id)
    try {
        res.status(200).json(getbyid)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

module.exports.addWE = async (req, res, next) => {
    const addWork = new AWorkExperienceModel({
        applicantId: req.params.applicantID,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
    })

    await addWork.save()
    try {
        res.status(200).json({
            message: 'Work Experience added'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

module.exports.deleteWE = async (req, res, next) => {
    const id = req.params.applicantID
    await AWorkExperienceModel.deleteOne({ applicantId: id })
    try {
        res.status(200).json({
            message: 'Work experience has been removed'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

module.exports.updateWE = async (req, res, next) => {
    const id = req.params.applicantID
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    await AWorkExperienceModel.update({ applicantId: id }, { $set: updateOps })
    try {
        res.status(200).json({
            message: 'work experience updated'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}