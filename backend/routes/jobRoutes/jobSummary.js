var express = require('express');
var router = express.Router();
const jobSummaryController = require('../../controllers/JobControllers/JobSummaryController')

/* GET users listing. */
router.get('/', jobSummaryController.viewAll);
router.get('/:id', jobSummaryController.viewByJobID);
router.post('/:jobid', jobSummaryController.addJobSummary);
router.patch('/:id', jobSummaryController.updateJobSummary);
router.delete('/:id', jobSummaryController.deleteJobSummary);

module.exports = router;
