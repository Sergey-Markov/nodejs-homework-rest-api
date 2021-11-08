const createError = require("http-errors");
const contactsOperations = require("../../model");

const getById = async (req, res, next) => {
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
};

module.exports = getById;
