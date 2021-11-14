const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validation, controllerWrapper } = require("../../middlewares");
const { validationsSchemes } = require("../../validations");

router.get("/", controllerWrapper(ctrl.getContactsList));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post(
  "/",
  validation(validationsSchemes.joiSchemaOnPOST),
  controllerWrapper(ctrl.add)
);

router.delete("/:contactId", controllerWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(validationsSchemes.joiSchemaOnPUT),
  controllerWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  controllerWrapper(ctrl.patchStatusOfContact)
);

module.exports = router;
