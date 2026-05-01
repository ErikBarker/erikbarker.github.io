const express = require('express');

const router = express.Router();

const {

    getUserData,
    loginUser,
    registerUser

} = require('../controller/userController');

const {protect} = require('../middleware/authMiddleware');

router.get('/user', protect, getUserData);
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router