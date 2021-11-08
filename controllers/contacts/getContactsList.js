const contactsOperations = require("../../model");

const getContactsList = async (req, res, next) => {
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
};

module.exports = getContactsList;
