const { Contact } = require("../../models");

const getContactsList = async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;
  const listContacts = await Contact.find(
    { owner: _id },
    "_id name email phone owner",
    { skip, limit: +limit }
  ).populate("owner", "_id email");
  res.json({
    status: "success",
    code: 200,
    data: listContacts,
  });
};

module.exports = getContactsList;
