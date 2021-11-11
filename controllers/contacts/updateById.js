const createError = require("http-errors");
const { Contact } = require("../../models");

const updateById = async (req, res, next) => {
  try {
    const body = req.body;
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
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
};

module.exports = updateById;
