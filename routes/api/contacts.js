const express = require("express");
const contactsOperations = require("../../model");
const router = express.Router();
const createError = require("http-errors");

const { validation } = require("../../middlewares");
const { validationsSchemes } = require("../../validations");

// const contactPostValidation = (req, res, next) => {
//   const joiSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     phone: Joi.number().positive().required(),
//   });
//   const { error } = joiSchema.validate(req.body);
//   if (error) {
//     const newError = new createError(400, "missing required name field");
//     next(newError);
//   }
//   next();
// };
// const contactPutValidation = (req, res, next) => {
//   const joiSchema = Joi.object({
//     name: Joi.string(),
//     email: Joi.string().email(),
//     phone: Joi.number().positive(),
//   });
//   const { error } = joiSchema.validate(req.body);
//   if (error) {
//     const newError = new createError(400, "missing fields");
//     next(newError);
//   }
//   next();
// };

router.get("/", async (req, res, next) => {
  try {
    const listContacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: listContacts,
    });
  } catch (error) {
    const err = new createError(500, `${error}`);
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw new createError(
        404,
        `Any Contact don't have id:${contactId}, contact not found`
      );
    }
    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validation(validationsSchemes.joiSchemaOnPOST),
  async (req, res, next) => {
    try {
      const newContact = await contactsOperations.addContact(req.body);
      res.status(201).json({
        status: 201,
        data: { ...newContact },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw new createError.NotFound(`Contact with id:${contactId} not found`);
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:contactId",
  validation(validationsSchemes.joiSchemaOnPUT),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { contactId } = req.params;
      const updatedContact = await contactsOperations.updateContact(
        contactId,
        body
      );
      if (!updatedContact) {
        res.status(404).json({
          status: 404,
          message: `Contact with id:${contactId} not found`,
        });
      }
      res.json({
        status: 200,
        data: { ...updatedContact },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
