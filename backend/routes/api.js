var express = require('express');
var router = express.Router();

const applicant = require('./applicantRoutes/applicant')
const expectedS = require('./applicantRoutes/expectedS')
const workE     = require('./applicantRoutes/workexperience')
const education = require('./applicantRoutes/education')

const jobHeader = require('./jobRoutes/jobHeader')
const jobInfo = require('./jobRoutes/jobInfo')
const jobBenefits = require('./jobRoutes/jobBenefits')
const jobSummary = require('./jobRoutes/jobSummary')
const company = require('./jobRoutes/companyOverview')

const application = require('./applicationRoutes/application')

const users = require('./users')

const images = require('./images')

router.use('/images', images)
router.use('/user', users);
router.use('/applicant', applicant);
router.use('/expectedSalary', expectedS);
router.use('/workExperience', workE);
router.use('/education', education);

router.use('/job', jobHeader);
router.use('/jobInfo', jobInfo);
router.use('/jobBenefits', jobBenefits);
router.use('/jobSummary', jobSummary);
router.use('/company', company);

router.use('/application', application);

module.exports = router;
