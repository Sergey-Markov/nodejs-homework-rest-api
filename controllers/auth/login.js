const { User } = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { NotFound, Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound(`User whith email:${email} not found`);
  }
  const comparePasswordsResults = bcrypt.compareSync(password, user.password);
  if (!comparePasswordsResults) {
    throw new Unauthorized("Email or Password is wrong, try again");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1w" });
  const updateUser = await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token: token,
    user: {
      email: email,
      subscription: updateUser.subscription,
    },
  });
};

module.exports = login;
