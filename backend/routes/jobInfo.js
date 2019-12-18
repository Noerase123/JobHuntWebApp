var express = require('express');
var router = express.Router();
const jobInfoController = require('../controllers/JobInfoController')

/* GET users listing. */
router.get('/', jobInfoController.viewAll);
router.get('/:jobid', jobInfoController.viewByJobID);
router.post('/:jobid', jobInfoController.addJobInfo);
router.patch('/:jobid', jobInfoController.updateJobInfo);
router.delete('/:jobid', jobInfoController.deleteJobInfo);

module.exports = router;
