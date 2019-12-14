var express = require('express');
var router = express.Router();
const applicant = require('./applicant')
const expectedS = require('./expectedS')
const workE = require('./workexperience')
const education = require('./education')

router.use('/applicant', applicant);
router.use('/expectedSalary', expectedS);
router.use('/workExperience', workE);
router.use('/education', education);

module.exports = router;
