const { NotFound, BadRequest } = require("http-errors");
const { User } = require("../../models");
const sendMail = require("../../utils");

const repeatedVerification = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "missing required field email" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound(`User whith email:${email} - not found`);
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  const verificationToken = user.verificationToken;
  const mail = {
    to: email,
    subject: "Повторное подтверждение регистрации",
    html: `<a href="http://localhost:3000/users/verify/${verificationToken}"> Нажмите для подтверждения регистрации</a> `,
  };
  await sendMail(mail);
  res.status(200).json({
    status: "200 OK",
    message: "Verification email sent",
  });
};

module.exports = repeatedVerification;
