var express = require('express');
var router = express.Router();
const CompanyController = require('../../controllers/JobControllers/CompanyOverviewController')

/* GET users listing. */
router.get('/', CompanyController.viewAll);
router.get('/:jobid', CompanyController.viewByJobID);
router.post('/:jobid', CompanyController.addComOverview);
router.patch('/:jobid', CompanyController.updateComOverview);
router.delete('/:jobid', CompanyController.deleteComOverview);

module.exports = router;
