const mongoose = require('mongoose')
const ExpectedSalary = require('../../models/AExpectedSalaryModel')

exports.viewAll = async (req, res, next) => {

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

exports.viewbyapplicantId = async (req, res, next) => {
    const id = req.params.id
    const getbyId = await ExpectedSalary.findById(id)
    try {
        res.status(200).json(getbyId)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.addES = async (req, res, next) => {
    const content = req.params.applicantID
    
    const have = await ExpectedSalary.find({applicantId: content}).count()

    if (have >= 1) {
        res.status(409).json({
            message: 'request has already given'
        })
    } else {

    const ES = new ExpectedSalary({
        applicantId: content,
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
}

exports.deleteES = async (req, res, next) => {
    const id = req.params.id

    await ExpectedSalary.findByIdAndDelete(id)
    try {
        res.status(200).json({
            message: `${id} expectedSalary deleted`
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.updateSalary = async (req, res, next) => {
    const id = req.params.applicantID
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    await ExpectedSalary.update({ _id: id }, { $set: updateOps })
    try {
        res.status(200).json({
            message: 'Expected salary updated'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}