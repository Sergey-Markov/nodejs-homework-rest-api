const { Contact } = require("../../models");

const patchStatusOfContact = async (req, res) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  console.log(favorite);
  if (favorite === undefined) {
    res.status(400).json({
      status: 400,
      message: `missing field favorite`,
    });
  }

  const updateStatusContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!updateStatusContact) {
    res.status(404).json({
      status: 404,
      message: `Not found`,
    });
  }
  res.json({
    status: 200,
    data: { ...updateStatusContact },
  });
};

module.exports = patchStatusOfContact;
