const mongoose = require('mongoose')
const Application = require('../../models/ApplicationModel')
const User = require('../../models/userModel')
const Job = require('../../models/JobHeaderModel')

exports.all = async (req,res,next) => {
    const all = await Application.find()

    try {
        res.status(200).json({
            data: all
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.getbyid = async (req,res,next) => {
    const id = req.params.id
    const get = await Application.findOne({jobId:id})

    try {
        res.status(200).json(get)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.getAll = async (req, res, next) => {
    const id = req.params.userID
    const app = await Application.find({userId: id}, { __v: 0, userId: 0 })

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
    const userid = req.params.userID
    const id = req.params.jobID

    const have = await Application.find({userId:userid, jobId:id}).countDocuments()

    if (have > 0) {
        res.status(409).json({
            message: "sorry your is invalid",
            count: have
        })
    } else {

        const ajob = await Job.findById(id)

        const confirm = {
            userId: userid,
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