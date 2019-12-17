var express = require('express');
var router = express.Router();
const jobHeaderController = require('../controllers/JobHeaderController')

/* GET users listing. */
router.get('/', jobHeaderController.viewAll);
router.get('/all/:jobid', jobHeaderController.viewJobs);
router.get('/:id', jobHeaderController.viewbyId);
router.post('/', jobHeaderController.addJobHeader);
router.patch('/:id', jobHeaderController.updateJobHeader);
router.delete('/:id', jobHeaderController.deleteJobHeader);

module.exports = router;
