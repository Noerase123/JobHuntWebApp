var express = require('express');
var router = express.Router();
const ESController = require('../../controllers/ApplicantControllers/AExpectedSalaryController')
const auth = require('../../middleware/Auth')

/* GET users listing. */
router.get('/', auth, ESController.viewAll);
router.get('/:id/', auth, ESController.viewbyapplicantId);
router.post('/:applicantID/', ESController.addES);
router.delete('/:id/', auth, ESController.deleteES);
router.patch('/:id/', auth, ESController.updateSalary);

module.exports = router;
