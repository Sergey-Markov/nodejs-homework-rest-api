const createError = require("http-errors");
const { Contact } = require("../../models");
const add = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json({
      status: 201,
      data: { ...newContact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
