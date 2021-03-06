const mongoose = require('mongoose')
const ApplicantModel = require('../../models/applicantModel')
const AES = require('../../models/AExpectedSalaryModel')
const AWE = require('../../models/AWorkExperienceModel')
const AE = require('../../models/AEducationModel')
const User = require('../../models/userModel')

let apiUrl = 'http://localhost:3030/api/applicant/emp/'

exports.viewEmployee = async (req, res, next) => {
    const id = req.params.applicantID


    const app = await ApplicantModel.findById(id, { __v: 0 })
    const exp = await AES.findOne({ applicantId: id }, {__v: 0, applicantId: 0 })
    const work = await AWE.find({ applicantId: id }, {__v: 0, applicantId: 0 })
    const educ = await AE.find({ applicantId: id }, {__v: 0, applicantId: 0 })

    if (app === null || exp === null || work === null || educ === null) {
        res.status(404).json({
            message: `${id} is not found`
        })
    }

    const person = {
        firstname: app.firstname,
        lastname: app.lastname,
        location: app.location,
        contactNo: app.contactNo,
        email: app.email,
        birthday: app.birthday,
        gender: app.gender
    }

    try {
        res.status(200).json({

            applicant: {
                id: app._id,
                basicInfo: person,
                expectedSalary: exp || 'No data',
                workExp: work || 'No data',
                education: educ || 'No data'
            }
        })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

exports.viewAll = async (req, res, next) => {

    const All = await ApplicantModel.find()

    try {
        const getAll = All.map(app => {
            return {
                info: {
                    _id: app._id,
                    userID: app.userId,
                    firstname: app.firstname,
                    lastname: app.lastname,
                    location: app.location,
                    contactNo: app.contactNo,
                    email: app.email,
                    birthday: app.birthday,
                    gender: app.gender
                },
                source: apiUrl + app._id
            }
        })
        res.status(200).json({
            data: getAll
        })
    } catch (err) {
        res.status(500).json({ error: err })
        console.log(JSON.parse(err))
    }

}

exports.viewbyId = async (req, res, next) => {
    const id = req.params.id
    const getbyId = await ApplicantModel.findById(id)

    if (getbyId === null) {
        res.status(404).json({
            message: `${id} is not found`
        })
    }

    try {
        res.status(200).json(getbyId)
    } catch (err) {
        res.status(500).json({ error: err })
        console.log(JSON.parse(err))
    }
}

exports.addApplicant = async (req, res, next) => {
    const userID = req.params.userID

    const have = await ApplicantModel.find({userId:userID})

    console.log(have.length)

    if (have.length > 0) {
        res.status(409).json({
            message: "sorry your request is conflict"
        })
    } else {

        const email = await User.findById(userID)

        const appli = new ApplicantModel({
            userId: userID,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            location: req.body.location,
            contactNo: req.body.contactNo,
            email: email.username,
            birthday: req.body.birthday,
            gender: req.body.gender
        })

        appli.save()
            .then(response => {
                res.status(201).json({
                    message: 'applicant added',
                    applicant_id: response._id
                })
            })
            .catch(err => {
                res.status(500).json(err)
                console.log(err)
            })
    }
}

exports.updateApplicant = async (req, res, next) => {
    const id = req.params.id

    if (id === null) {
        res.status(404).json({
            message: `${id} is not found`
        })
    }
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.key] = ops.value
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

exports.deleteApplicant = async (req, res, next) => {
    const id = req.params.id
    const deletee = await ApplicantModel.deleteOne({ _id: id })
    try {
        res.status(200).json({
            message: `(${id}) applicant deleted`
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
}