const { Contact } = require("../../models");

const getContactsList = async (_, res) => {
  const { _id } = req.user;
  const listContacts = await Contact.find({ owner: _id });
  res.json({
    status: "success",
    code: 200,
    data: listContacts,
  });
};

module.exports = getContactsList;
