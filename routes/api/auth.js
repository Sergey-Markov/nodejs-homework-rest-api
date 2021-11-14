const express = require("express");
const router = express.Router();
const { validation, controllerWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { validationsSchemes } = require("../../validations");

router.post(
  "/registration",
  validation(validationsSchemes.joiSchemaOnRegistration),
  controllerWrapper(ctrl.registration)
);

module.exports = router;
