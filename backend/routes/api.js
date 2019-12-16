var express = require('express');
var router = express.Router();

const applicant = require('./applicant')
const expectedS = require('./expectedS')
const workE     = require('./workexperience')
const education = require('./education')

const jobHeader = require('./jobHeader')
const jobInfo = require('./jobInfo')

router.use('/applicant', applicant);
router.use('/expectedSalary', expectedS);
router.use('/workExperience', workE);
router.use('/education', education);

router.use('/job', jobHeader);
router.use('/jobInfo', jobInfo);

module.exports = router;
