const { Contact } = require("../../models");

const getContactsList = async (req, res) => {
  const { page = 1, limit = 100, favorite } = req.query;
  if (page >= 1 && limit >= 1) {
    const { _id } = req.user;
    if (page && limit) {
      const skip = (page - 1) * limit;
      const listContacts = await Contact.find(
        { owner: _id },
        "_id name email phone favorite owner",
        { skip, limit: +limit }
      ).populate("owner", "_id email");
      res.json({
        status: "success",
        code: 200,
        data: listContacts,
      });
    }

    if (favorite) {
      const listOfFavoriteContacts = await Contact.find({
        owner: _id,
        favorite: favorite,
      });
      res.status(200).json({
        status: "Succes",
        code: 200,
        data: listOfFavoriteContacts,
      });
    }
  } else {
    res.status(400).json({
      status: "BadRequest",
      code: 400,
      message: "field page or limit has incorrect type",
    });
    return;
  }
};

module.exports = getContactsList;
