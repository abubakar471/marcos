const express = require("express");
const { createPassword, getPasswords, deletePassword, updatePassword } = require("../controllers/password");
const router = express.Router();

router.post("/create-password", createPassword);
router.post("/get-passwords", getPasswords);
router.post("/delete-password", deletePassword);
router.post("/update-password", updatePassword);

module.exports = router;