var express = require('express');
var router = express.Router();
const educationController = require('../../controllers/ApplicantControllers/AEducationController')
const auth = require('../../middleware/Auth')

/* GET users listing. */
router.get('/', auth, educationController.viewAll);
router.get('/:applicantID', auth, educationController.viewbyId);
router.post('/:applicantID', auth, educationController.addEduc);
router.patch('/:applicantID', auth, educationController.updateEduc);
router.delete('/:applicantID', auth, educationController.deleteEduc);

module.exports = router;