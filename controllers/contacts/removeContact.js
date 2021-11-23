const createError = require("http-errors");
const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new createError.NotFound(`Contact with id:${contactId} not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContact;
