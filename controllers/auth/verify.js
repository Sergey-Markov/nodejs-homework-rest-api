const { NotFound } = require("http-errors");
const { User } = require("../../models");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new NotFound("User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });
  res.status(200).json({
    status: "200 Ok",
    message: "Verification successful",
  });
};

module.exports = verify;
