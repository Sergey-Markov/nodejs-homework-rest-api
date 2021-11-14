const express = require("express");
const router = express.Router();
const { validation, controllerWrapper } = require("../../middlewares");
// const { auth: ctrl } = require("../../controllers");

// router.post("/registration", ctrl.registration);

module.exports = router;
