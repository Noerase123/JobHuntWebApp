const mongoose = require('mongoose')
const educationModel = require('../../models/AEducationModel')

exports.viewAll = async (req, res, next) => {
    const getAll = await educationModel.find()
    try {
        res.status(200).json({
            data: getAll
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.viewbyId = async (req, res, next) => {
    const id = req.params.applicantID
    const getbyId = await educationModel.find({applicantId: id})
    try {
        res.status(200).json(getbyId)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.addEduc = async (req, res, next) => {
    const ES = new educationModel({
        applicantId: req.params.applicantID,
        educationAttained: req.body.educationAttained,
        course: req.body.course,
        school: req.body.school,
        fromYear: req.body.fromYear,
        graduated: req.body.graduated,
        description: req.body.description
    })
    await ES.save()
    try {
        res.status(201).json({
            message: `education added to ${res.applicantId}`
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.deleteEduc = async (req, res, next) => {
    const id = req.params.applicantID

    await educationModel.deleteMany({ applicantId: id })
    try {
        res.status(200).json({
            message: `${id} educationModel deleted`
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.updateEduc = async (req, res, next) => {
    const id = req.params.applicantID
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    await educationModel.update({ applicantId: id }, { $set: updateOps })
    try {
        res.status(200).json({
            message: 'Expected salary'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}