const express = require('express');
const router = express.Router();
// authenthication middleware
const authMiddleware = require("../middleware/authMiddleware");

// user controler
const { register, login, checkuser } = require("../controller/userController");

// register route
router.post("/register", register);

// login user
router.post("/login", login);

// check user
router.get("/check", authMiddleware, checkuser);

module.exports = router;