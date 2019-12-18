var express = require('express');
var router = express.Router();
const jobBenefitsController = require('../controllers/JobBenefitsController')

/* GET users listing. */
router.get('/', jobBenefitsController.viewAll);
router.get('/:jobid', jobBenefitsController.viewByJobID);
router.post('/:jobid', jobBenefitsController.addJobBenefits);
router.patch('/:jobid', jobBenefitsController.updateJobBenefits);
router.delete('/:jobid', jobBenefitsController.deleteJobBenefits);

module.exports = router;
