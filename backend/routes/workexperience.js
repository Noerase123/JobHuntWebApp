var express = require('express');
var router = express.Router();
const AworkExpController = require('../controllers/AWorkExperienceController')
const auth = require('../middleware/Auth')
/* GET users listing. */
router.get('/', auth, AworkExpController.viewAll);
router.get('/:applicantID', auth, AworkExpController.viewbyId);
router.post('/:applicantID', auth, AworkExpController.addWE);
router.patch('/:applicantID', auth, AworkExpController.updateWE);
router.delete('/:applicantID', auth, AworkExpController.deleteWE);

module.exports = router;
