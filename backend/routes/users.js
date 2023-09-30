const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authenticate = require('../auth/authenticate');

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.post('/update', authenticate.verifyAuth, usersController.updateUser);
router.post('/delete', authenticate.verifyAuth, usersController.deleteUser);

module.exports = router;