const { User } = require("../../models");
const { NotFound, Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");

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
  res.json({
    message: "wellcome",
  });
};

module.exports = login;
