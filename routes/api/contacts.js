const express = require("express");
const contactsOperations = require("../../model");
const router = express.Router();
const createError = require("http-errors");
const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

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

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = joiSchema.validate(body);
    if (error) {
      throw new createError(400, error.message);
    }
    const newContact = await contactsOperations.addContact(body);
    res.status(201).json({
      status: 201,
      data: { ...newContact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = joiSchema.validate(body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { contactId } = req.params;
    const updatedContact = await contactsOperations.updateContact(
      contactId,
      body
    );
    res.json({
      status: 200,
      data: { updatedContact },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
