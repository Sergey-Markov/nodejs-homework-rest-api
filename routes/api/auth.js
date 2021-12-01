const express = require("express");
const router = express.Router();
const {
  validation,
  controllerWrapper,
  authenticate,
  uploadAwatarMiddleware,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { validationsSchemes } = require("../../validations");

router.post(
  "/signup",
  validation(validationsSchemes.joiSchemaOnAuth),
  controllerWrapper(ctrl.registration)
); ///registration

router.post(
  "/login",
  validation(validationsSchemes.joiSchemaOnAuth),
  controllerWrapper(ctrl.login)
);

router.post("/logout", authenticate, controllerWrapper(ctrl.logout)); //можно использовать GET-запрос, т.к., будет отсутствовать тело запроса

router.get("/current", authenticate, controllerWrapper(ctrl.current));

router.patch(
  "/subscription",
  authenticate,
  controllerWrapper(ctrl.subscriptionChange)
);

router.patch(
  "/avatars",
  authenticate,
  uploadAwatarMiddleware.single("avatarURL"),
  controllerWrapper(ctrl.changeUserAvatar)
);

router.get("/verify/:verificationToken", controllerWrapper(ctrl.verify));
router.post("/verify", controllerWrapper(ctrl.repeatedVerification));

module.exports = router;
