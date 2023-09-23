const express = require("express");
const router = express.Router();

router.get("/create-password", async(req,res) => {
    console.log(req.body);
})

module.exports = router;