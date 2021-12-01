const registration = require("./registration");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const subscriptionChange = require("./subscriptionChange");
const changeUserAvatar = require("./changeUserAvatar");
const verify = require("./verify");
const repeatedVerification = require("./repeatedVerification");
module.exports = {
  registration,
  login,
  logout,
  current,
  subscriptionChange,
  changeUserAvatar,
  verify,
  repeatedVerification,
};
