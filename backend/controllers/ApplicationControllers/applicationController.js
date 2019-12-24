const mongoose = require('mongoose')
const Application = require('../../models/ApplicationModel')
const User = require('../../models/userModel')
const Job = require('../../models/JobHeaderModel')

exports.getAll = async (req, res, next) => {
    const id = req.params.userID
    const app = await Application.find({},{__v: 0, userId: 0})

    try {
        res.status(200).json({
            user_id: id,
            jobApps: app
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.addApp = async (req, res, next) => {
    const id = req.params.jobID
    const ajob = await Job.findById(id)

    const confirm = {
        userId: req.params.userID,
        jobId: id,
        jobTitle: ajob.jobTitle,
        company: ajob.company
    }

    const app = new Application(confirm)
    await app.save()

    try {
        res.status(200).json({
            message: `application added to ${req.params.userID}`
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.deleteApp = async (req, res, next) => {
    const id = req.params.id
    await Application.deleteOne({ _id: id })

    try {
        res.status(200).json({
            message: 'application deleted'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}