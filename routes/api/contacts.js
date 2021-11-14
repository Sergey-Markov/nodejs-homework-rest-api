const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validation, controllerWrapper } = require("../../middlewares");
const { validationsSchemes } = require("../../validations");

router.get("/", controllerWrapper(ctrl.getContactsList));

router.get("/:contactId", ctrl.getById);

router.post("/", validation(validationsSchemes.joiSchemaOnPOST), ctrl.add);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  validation(validationsSchemes.joiSchemaOnPUT),
  ctrl.updateById
);

router.patch("/:contactId/favorite", ctrl.patchStatusOfContact);

module.exports = router;
