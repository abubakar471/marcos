const express = require("express");
const { createPassword, getPasswords } = require("../controllers/password");
const router = express.Router();

router.post("/create-password", createPassword);
router.post("/get-passwords", getPasswords);

module.exports = router;