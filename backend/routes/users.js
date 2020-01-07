var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const auth = require('../middleware/Auth')


/* GET users listing. */
router.post('/login',userController.login)
router.post('/signup', userController.signup)
router.get('/getUsers', userController.getUsers)
router.get('/getOne/:id', userController.getOne)
router.delete('/:id', userController.deleteOne)

module.exports = router;
