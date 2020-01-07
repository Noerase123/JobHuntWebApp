const mongoose = require('mongoose')
const User = require('../models/userModel')
const Applicant = require('../models/applicantModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var request = require('request');
const ip = require('ip')

exports.login = async (req, res, next) => {
    const user = await User.find({ username: req.body.username })

    const applicant = await Applicant.find({ userId: user[0]._id })

    try {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'username not exist'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth failed",
                    hints: "Incorrect password"
                })
            }
            if (result) {
                const private_key = 'secret'
                const payload = {
                    user: user[0],
                    info: applicant[0]

                }
                const token = jwt.sign(payload, private_key, {
                    expiresIn: '8670h'
                })
                return res.status(200).json({
                    message: 'Auth login',
                    token: token,
                })
            }
            return res.status(401).json({
                message: "Auth failed",
                hints: "Incorrect password"
            })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.signup = async (req, res, next) => {
    const user = await User.find({ username: req.body.username })

    try {

        if (user.length >= 1) {
            return res.status(409).json({
                message: 'User Exist!'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const registerUser = new User({
                        username: req.body.username,
                        password: hash,
                        ipCreated: ip.address()
                    })
                    registerUser.save()
                        .then(response => {
                            res.status(201).json({
                                message: 'User created',
                                userId: response._id
                            })
                        })
                        .catch(err => {
                            res.status(500).json(err)
                            console.log(err)
                        })
                }
            })
        }
    } catch (err) {
        res.status(500).json({
            error1: err
        })
        console.log(err)
    }
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find()

    try {
        res.status(200).json({
            data: users
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.getOne = async (req, res, next) => {
    const id = req.params.id

    const data = await User.findById(id)

    try {
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.deleteOne = async (req,res,next) => {
    const id = req.params.id

    const data = await User.findByIdAndDelete(id)

    try {
        res.status(200).json({
            message: 'User deleted'
        })
    } catch (err) {
        res.status(500).json(err)
    }
}