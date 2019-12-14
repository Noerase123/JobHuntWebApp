const mongoose = require('mongoose')
const ApplicantModel = require('../models/applicantModel')

module.exports.viewAll = async (req, res, next) => {
    const getAll = await ApplicantModel.find()

    try {
        res.status(200).json({
            data: getAll
        })
    } catch (err) {
        res.status(500).json({ error: err })
        console.log(JSON.parse(err))
    }

}

module.exports.viewbyId = async (req, res, next) => {
    const id = req.params.id
    const getbyId = await ApplicantModel.findById(id)

    try {
        res.status(200).json(getbyId)
    } catch (err) {
        res.status(500).json({ error: err })
        console.log(JSON.parse(err))
    }
}

module.exports.addApplicant = async (req, res, next) => {
    const appli = new ApplicantModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        location: req.body.location,
        contactNo: req.body.contactNo,
        email: req.body.email,
        birthday: req.body.birthday,
        gender: req.body.gender
    })

    await appli.save()
    try {
        res.status(201).json({
            message: 'Applicant added'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

module.exports.updateApplicant = async (req, res, next) => {
    const id = req.params.id
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    await ApplicantModel.update({ _id: id }, { $set: updateOps })
    try {
        res.status(200).json({
            message: 'applicant updated'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

module.exports.deleteApplicant = async (req, res, next) => {
    const id = req.params.id
    await ApplicantModel.deleteOne({ _id: id })
    try {
        res.status(200).json({
            message: `(${id}) applicant deleted`
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
}