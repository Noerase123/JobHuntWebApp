const mongoose = require('mongoose')
const ExpectedSalary = require('../models/AExpectedSalaryModel')

module.exports.viewAll = async (req, res, next) => {

    const getAll = await ExpectedSalary.find()
    try {
        res.status(200).json({
            data: getAll
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

module.exports.viewbyapplicantId = async (req, res, next) => {
    const applicantID = req.params.applicantID
    const getbyId = await ExpectedSalary.find({applicantId: applicantID})
    try {
        res.status(200).json(getbyId)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

module.exports.addES = async (req, res, next) => {
    const ES = new ExpectedSalary({
        applicantId: req.params.applicantID,
        minimum: req.body.minimum,
        maximum: req.body.maximum,
        currency: req.body.currency,
        frequency: req.body.frequency
    })
    await ES.save()
    try {
        res.status(201).json({
            message: `expectedSalary added`
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

module.exports.deleteES = async (req, res, next) => {
    const id = req.params.applicantID

    await ExpectedSalary.deleteMany({ applicantId: id })
    try {
        res.status(200).json({
            message: `${id} expectedSalary deleted`
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

module.exports.deleteESbyID = async (req, res, next) => {
    const id = req.params.id

    await ExpectedSalary.deleteOne({ _id: id })
    try {
        res.status(200).json({
            message: `${id} expectedSalary deleted`
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

module.exports.updateSalary = async (req, res, next) => {
    const id = req.params.applicantID
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    await ExpectedSalary.update({ applicantId: id }, { $set: updateOps })
    try {
        res.status(200).json({
            message: 'Expected salary'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}