const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

// const mail = {
//   to: "",
//   from: "1nativeflag@gmail.com",
//   subject: "Подтверждение регистрации",
//   html: `<a href="http//:localhost:3000/users//verify/${verificationToken}"> Нажмите для подтверждения</a> `,
// };

// sgMail
//   .send(mail)
//   .then(() => console.log("Email success send"))
//   .catch((error) => console.log(error.message));

const sendMail = async (data) => {
  const email = { ...data, from: "1nativeflag@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendMail;
