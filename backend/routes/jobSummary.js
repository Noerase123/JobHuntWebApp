var express = require('express');
var router = express.Router();
const jobSummaryController = require('../controllers/JobSummaryController')

/* GET users listing. */
router.get('/', jobSummaryController.viewAll);
router.get('/:jobid', jobSummaryController.viewByJobID);
router.post('/:jobid', jobSummaryController.addJobSummary);
router.patch('/:jobid', jobSummaryController.updateJobSummary);
router.delete('/:jobid', jobSummaryController.deleteJobSummary);

module.exports = router;
