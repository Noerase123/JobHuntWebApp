var express = require('express');
var router = express.Router();
const applicantController = require('../controllers/applicantController')
const auth = require('../middleware/Auth')

/* GET users listing. */
router.get('/', auth, applicantController.viewAll);
router.get('/emp/:applicantID', auth, applicantController.viewEmployee);
router.get('/:id', auth, applicantController.viewbyId);
router.post('/:userID', applicantController.addApplicant);
router.patch('/:id', auth, applicantController.updateApplicant);
router.delete('/:id', auth, applicantController.deleteApplicant);

module.exports = router;
