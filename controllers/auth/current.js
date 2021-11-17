const { User } = require("../../models");

const current = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await User.findById(_id);
  res.json({
    email: currentUser.email,
    subscription: currentUser.subscription,
  });
};

module.exports = current;
