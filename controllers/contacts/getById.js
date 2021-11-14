const createError = require("http-errors");
const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
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
};

module.exports = getById;
