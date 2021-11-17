const express = require("express");
const router = express.Router();
const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { validationsSchemes } = require("../../validations");

router.post(
  "/registration",
  validation(validationsSchemes.joiSchemaOnAuth),
  controllerWrapper(ctrl.registration)
);

router.post(
  "/login",
  validation(validationsSchemes.joiSchemaOnAuth),
  controllerWrapper(ctrl.login)
);

router.post("/logout", authenticate, controllerWrapper(ctrl.logout)); //можно использовать GET-запрос, т.к., будет отсутствовать тело запроса

module.exports = router;
