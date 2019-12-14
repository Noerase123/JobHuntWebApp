var express = require('express');
var router = express.Router();
const ESController = require('../controllers/AExpectedSalaryController')

/* GET users listing. */
router.get('/', ESController.viewAll);
router.get('/:applicantID/', ESController.viewbyapplicantId);
router.post('/:applicantID/', ESController.addES);
router.delete(':applicantID/', ESController.deleteES);
router.patch('/:applicantID/', ESController.updateSalary);

module.exports = router;
