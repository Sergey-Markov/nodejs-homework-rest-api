const { User } = require("../../models");
require("dotenv").config();

const { ADMIN_PASSWORD } = process.env;

const subscriptionChange = async (req, res) => {
  const { id, password, newValueOfSubscription } = req.body;

  if (!id || !password || !newValueOfSubscription) {
    res.status(400).json({
      message: "missing fields",
    });
  }
  if (password !== ADMIN_PASSWORD) {
    res.status(423).json({
      message: "Locked",
    });
  }

  const newUserSubscription = await User.findByIdAndUpdate(
    id,
    {
      subscription: newValueOfSubscription,
    },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    code: 200,
    data: {
      subscription: newUserSubscription.subscription,
      email: newUserSubscription.email,
      user_id: newUserSubscription._id,
    },
  });
};

module.exports = subscriptionChange;
