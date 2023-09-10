const express = require('express');
const router = express.Router();
const {getTrain, getTrains} = require("../controllers/trainController");
// const { validateToken } = require('../middleware/ValidateTokenHandle');

router.route("/").get(getTrains)
router.route("/:id").get(getTrain)
module.exports = router;