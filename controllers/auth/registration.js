const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
// const ddd = require("../../public/avatars/avatarkaQttR.jpg");
const gravatar = require("gravatar");
const path = require("path");

const defAvatarPath = path.join(
  __dirname,
  "../../public/avatars/",
  "avatarkaQttR.jpg"
);

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email:${email} allready exist`);
  }
  const avatarURL = gravatar.url(defAvatarPath);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL: `https:${avatarURL}`,
  });
  res.status(201).json({
    user: {
      email: email,
      subscription: newUser.subscription,
      avatarURL: `https:${avatarURL}`,
    },
  });
};

module.exports = registration;
