var express = require('express');
var router = express.Router();
const educationController = require('../controllers/AEducationController')

/* GET users listing. */
router.get('/', educationController.viewAll);
router.get('/:applicantID', educationController.viewbyId);
router.post('/:applicantID', educationController.addEduc);
router.patch('/:applicantID', educationController.updateEduc);
router.delete('/:applicantID', educationController.deleteEduc);

module.exports = router;