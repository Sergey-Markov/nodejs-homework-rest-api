const validation = require("./validation");
const controllerWrapper = require("./controllerWrapper");
const authenticate = require("./authenticate");
const uploadAwatarMiddleware = require("./uploadAvatar");
module.exports = {
  validation,
  controllerWrapper,
  authenticate,
  uploadAwatarMiddleware,
};
