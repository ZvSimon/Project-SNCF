const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userController = require('../controllers/user.controller')
const auth = require('../middlewares/auth.middleware')

// parse requests
router.use(bodyParser.json());

// routes
router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.put('/:id', auth, userController.updateUser);

module.exports = router;
