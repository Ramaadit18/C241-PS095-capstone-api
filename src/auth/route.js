const express = require('express');
const { login, logout } = require('./handler');
const router = express.Router();

// Route for user login
router.post('/login', login);

// Route for user logout
router.post('/logout', logout);

module.exports = router;
