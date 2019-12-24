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
    const exp = await AES.findOne({ applicantId: id }, { _id: 0, __v: 0, applicantId: 0 })
    const work = await AWE.find({ applicantId: id }, { _id: 0, __v: 0, applicantId: 0 })
    const educ = await AE.find({ applicantId: id }, { _id: 0, __v: 0, applicantId: 0 })


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
    const All = await ApplicantModel.find({}, { __v: 0 })

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
    const getbyId = await ApplicantModel.find({userId:id})

    try {
        res.status(200).json(getbyId)
    } catch (err) {
        res.status(500).json({ error: err })
        console.log(JSON.parse(err))
    }
}

exports.addApplicant = async (req, res, next) => {
    const userID = req.params.userID

    const email = await User.findById(userID)

    console.log(email.username)

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

exports.updateApplicant = async (req, res, next) => {
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

exports.deleteApplicant = async (req, res, next) => {
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