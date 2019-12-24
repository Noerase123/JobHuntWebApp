var express = require('express');
var router = express.Router();
const applicationController = require('../../controllers/ApplicationControllers/applicationController')
const auth = require('../../middleware/Auth')

/* GET users listing. */
router.get('/:userID', auth, applicationController.getAll);
router.post('/:userID/:jobID', auth, applicationController.addApp);
router.delete('/:id', auth, applicationController.deleteApp);

module.exports = router;
