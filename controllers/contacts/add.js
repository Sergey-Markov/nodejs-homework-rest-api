const createError = require("http-errors");
const contactsOperations = require("../../model");

const add = async (req, res, next) => {
  try {
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: 201,
      data: { ...newContact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
