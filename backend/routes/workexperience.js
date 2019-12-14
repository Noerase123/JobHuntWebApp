var express = require('express');
var router = express.Router();
const AworkExpController = require('../controllers/AWorkExperienceController')
/* GET users listing. */
router.get('/', AworkExpController.viewAll);
router.get('/:applicantID', AworkExpController.viewbyId);
router.post('/:applicantID', AworkExpController.addWE);
router.patch('/:applicantID', AworkExpController.updateWE);
router.delete('/:applicantID', AworkExpController.deleteWE);

module.exports = router;
