const express = require("express");
const { subscribeNewsletter } = require("../controllers/newsletter");
const router = express.Router();

router.post("/subscribe-newsletter", subscribeNewsletter);

module.exports = router;