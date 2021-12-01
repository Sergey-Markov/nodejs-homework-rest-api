const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendMail = require("../../utils");

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email:${email} allready exist`);
  }
  const avatarURL = gravatar.url("emerleite@gmail.com", { protocol: "https" });

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = nanoid();

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Подтверждение регистрации",
    html: `<a href="http//:localhost:3000/users//verify/${verificationToken}"> Нажмите для подтверждения </a> `,
  };
  await sendMail(mail);
  res.status(201).json({
    user: {
      email: email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = registration;
