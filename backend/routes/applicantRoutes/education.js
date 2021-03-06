var express = require('express');
var router = express.Router();
const educationController = require('../../controllers/ApplicantControllers/AEducationController')
const auth = require('../../middleware/Auth')

/* GET users listing. */
router.get('/', auth, educationController.viewAll);
router.get('/:id', auth, educationController.viewbyId);
router.post('/:applicantID', educationController.addEduc);
router.patch('/:id', auth, educationController.updateEduc);
router.delete('/:id', auth, educationController.deleteEduc);

module.exports = router;