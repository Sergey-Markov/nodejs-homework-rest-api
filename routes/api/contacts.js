const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const { validationsSchemes } = require("../../validations");

router.get("/", authenticate, controllerWrapper(ctrl.getContactsList)); //http://localhost:3000/api/contacts?page=1&limit=10   whith pagination

router.get("/:contactId", authenticate, controllerWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(validationsSchemes.joiSchemaOnPOST),
  controllerWrapper(ctrl.add)
);

router.delete(
  "/:contactId",
  authenticate,
  controllerWrapper(ctrl.removeContact)
);

router.put(
  "/:contactId",
  authenticate,
  validation(validationsSchemes.joiSchemaOnPUT),
  controllerWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  controllerWrapper(ctrl.patchStatusOfContact)
);

module.exports = router;
