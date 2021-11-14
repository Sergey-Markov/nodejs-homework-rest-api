const { User } = require("../../models");
const { Conflict } = require("http-errors");

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email:${email} allready exist`);
  }
  await User.create({ email, password });
  res.status(201).json({
    status: "Successful",
    code: 201,
    message: "Registration successful",
  });
};

module.exports = registration;
