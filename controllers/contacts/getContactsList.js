const { Contact } = require("../../models");

const getContactsList = async (req, res, next) => {
  try {
    const listContacts = await Contact.find();
    res.json({
      status: "success",
      code: 200,
      data: listContacts,
    });
  } catch (error) {
    const err = new createError(500, `${error}`);
    next(err);
  }
};

module.exports = getContactsList;
