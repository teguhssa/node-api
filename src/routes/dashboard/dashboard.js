const router = require("express").Router();

const dahsboardC = require("../../controller/dashboard/dahsboardC");

router.get("/", dahsboardC.dashboadInfo);

module.exports = router;
