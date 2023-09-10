const express = require('express');
const {loginUser} = require('../controllers/userController');
// const { validateToken } = require('../middleware/ValidateTokenHandle');
const router = express.Router();

router.post("/login", loginUser);

module.exports = router;