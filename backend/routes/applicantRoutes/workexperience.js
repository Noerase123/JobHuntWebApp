var express = require('express');
var router = express.Router();
const AworkExpController = require('../../controllers/ApplicantControllers/AWorkExperienceController')
const auth = require('../../middleware/Auth')
/* GET users listing. */
router.get('/', auth, AworkExpController.viewAll);
router.get('/:id', auth, AworkExpController.viewbyId);
router.post('/:applicantID', auth, AworkExpController.addWE);
router.patch('/:id', auth, AworkExpController.updateWE);
router.delete('/:id', auth, AworkExpController.deleteWE);

module.exports = router;
