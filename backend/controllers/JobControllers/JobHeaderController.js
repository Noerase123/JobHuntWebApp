const mongoose = require('mongoose')
const JobHeaderModel = require('../../models/JobHeaderModel')
const JobInfoModel = require('../../models/JobInfoModel')
const JobBenefits = require('../../models/JobBenefitsModel')
const JobSummary = require('../../models/JobSummaryModel')
const Company = require('../../models/CompanyOverviewModel')
const Application = require('../../models/ApplicationModel')

let apiUrl = 'http://localhost:3030/api/job/all/'

exports.viewJobs = async (req, res, next) => {
    const id = req.params.jobid

    const header = await JobHeaderModel.findById(id, { __v: 0 })
    const info = await JobInfoModel.findOne({ jobId: id }, { __v: 0, _id: 0, jobId: 0 })
    const benefits = await JobBenefits.findOne({ jobId: id }, { __v: 0, _id: 0, jobId: 0 })
    const summary = await JobSummary.findOne({ jobId: id }, { __v: 0, _id: 0, jobId: 0 })
    const company = await Company.findOne({ jobId: id }, { __v: 0, _id: 0, jobId: 0 })

    const head = {
        datePosted: header.datePosted,
        jobTitle: header.jobTitle,
        company: header.company,
        location: header.location,
        salary: header.salary,
        fullTime: header.fullTime
    }

    try {
        res.status(200).json({
            Job: {
                id: header._id,
                header: head,
                JobInfo: info,
                JobBenefits: benefits,
                JobSummary: summary,
                AboutCompany: company
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }

}

const queryVar = function(str) {
    let q = str.replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-z\s]+/gi, '').replace(/\s+$/, '');

    let parts = q.split(/\s/);
    let terms = [];
    parts.forEach(part => {
        if(stopwords.indexOf(part) === -1) {
            terms.push(part);
        }
    });
    let query = {'$and': []};
    terms.forEach(term => {
       let queryFrag = {jobTitle: {'$regex': term, '$options': 'i'}};
       query['$and'].push(queryFrag);
    });
    return query;
};

exports.searchItem = async (req,res,next) => {
    let searchQuery = req.query.term;
    const search = await JobHeaderModel.find
    ({'$and': [
            {'jobTitle': 
                {'$regex': searchQuery,
                '$options': 'i'
                }
            }
        ]
    });
    try {
        res.status(200).json(search)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.appliedjob = async (req, res, next) => {
    const userid = req.params.userID
    const id = req.params.id

    const app = await Application.findOne({ userId: userid, jobId: id }).count()

    const result = app > 0 ? true : false;

    try {
        res.status(200).json({
            user: userid,
            appliedToJob: result
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }

}

exports.viewOne = async (req, res, next) => {
    const id = req.params.id

    const job = await JobHeaderModel.findById(id)

    try {
        res.status(200).json(job)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.viewAll = async (req, res, next) => {

    const All = await JobHeaderModel.find({}, { __v: 0 })

    try {
        const getall = All.map(job => {
            return {
                id: job._id,
                jobInfo: {
                    jobTitle: job.jobTitle,
                    company: job.company,
                    location: job.location,
                    salary: job.salary,
                    fullTime: job.fullTime,
                    datePosted: job.datePosted
                },
                source: apiUrl + job._id
            }
        })
        res.status(200).json({
            data: getall,
        })
    } catch (err) {
        res.status(500).json({ error: err })
        console.log(JSON.parse(err))
    }

}

exports.addJobHeader = (req, res, next) => {
    const appli = new JobHeaderModel({
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        location: req.body.location,
        salary: req.body.salary,
        fullTime: req.body.fullTime
    })
    appli.save()
        .then(response => {
            res.status(201).json({
                message: 'Job Added',
                jobID : response._id
            })
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
}

exports.updateJobHeader = async (req, res, next) => {
    const id = req.params.id
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.key] = ops.value
    }
    await JobHeaderModel.update({ _id: id }, { $set: updateOps })
    try {
        res.status(200).json({
            message: 'Job updated'
        })
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}

exports.deleteJobHeader = async (req, res, next) => {
    const id = req.params.id
    await JobHeaderModel.deleteOne({ _id: id })
    try {
        res.status(200).json({
            message: `(${id}) Job deleted`
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
}