var express = require('express');
var router = express.Router();
const jobHeaderController = require('../../controllers/JobControllers/JobHeaderController')

/* GET users listing. */
router.get('/', jobHeaderController.viewAll);
router.get('/applied/:id/:userID', jobHeaderController.appliedjob);
router.get('/:id/', jobHeaderController.viewOne);
router.get('/all/:jobid', jobHeaderController.viewJobs);
router.post('/', jobHeaderController.addJobHeader);
router.patch('/:id', jobHeaderController.updateJobHeader);
router.delete('/:id', jobHeaderController.deleteJobHeader);

module.exports = router;
