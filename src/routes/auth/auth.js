const express = require("express");
const router = express.Router();
const validInfo = require("../../middleware/validInfo");

const authController = require("../../controller/auth/authController");

router.post("/registration", validInfo, authController.Registration);
router.post("/login", validInfo, authController.Login);

module.exports = router;
