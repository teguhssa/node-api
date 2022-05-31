const express = require("express");
const router = express.Router();

const generate = require("../../controller/generate/generateData");

router.post("/", generate.generateData);

module.exports = router;
