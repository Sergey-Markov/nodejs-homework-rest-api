const createError = require("http-errors");
const contactsOperations = require("../../model");

const removeContact = async (req, res, next) => {
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
};

module.exports = removeContact;
