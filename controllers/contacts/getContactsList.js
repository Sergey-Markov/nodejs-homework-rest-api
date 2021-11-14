const { Contact } = require("../../models");

const getContactsList = async (_, res) => {
  const listContacts = await Contact.find();
  res.json({
    status: "success",
    code: 200,
    data: listContacts,
  });
};

module.exports = getContactsList;
