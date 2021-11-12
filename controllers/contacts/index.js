const getContactsList = require("./getContactsList");
const getById = require("./getById");
const removeContact = require("./removeContact");
const add = require("./add");
const updateById = require("./updateById");
const patchStatusOfContact = require("./patchStatusOfContact");
module.exports = {
  getContactsList,
  getById,
  removeContact,
  add,
  updateById,
  patchStatusOfContact,
};
