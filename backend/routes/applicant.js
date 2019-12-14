var express = require('express');
var router = express.Router();
const applicantController = require('../controllers/applicantController')

/* GET users listing. */
router.get('/', applicantController.viewAll);
router.get('/:id', applicantController.viewbyId);
router.post('/', applicantController.addApplicant);
router.patch('/:id', applicantController.updateApplicant);
router.delete('/:id', applicantController.deleteApplicant);

module.exports = router;
