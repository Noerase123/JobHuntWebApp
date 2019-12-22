var express = require('express');
var router = express.Router();
const ESController = require('../../controllers/ApplicantControllers/AExpectedSalaryController')
const auth = require('../../middleware/Auth')

/* GET users listing. */
router.get('/', auth, ESController.viewAll);
router.get('/:applicantID/', auth, ESController.viewbyapplicantId);
router.post('/:applicantID/', auth, ESController.addES);
router.delete(':applicantID/', auth, ESController.deleteES);
router.delete('/deleteID/:id', auth, ESController.deleteESbyID);
router.patch('/:applicantID/', auth, ESController.updateSalary);

module.exports = router;
