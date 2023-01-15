const autenticate = require("./autenticate");
const validateAuth = require("./validateAuth");
const { upload } = require("./upload");
const validateContacts = require("./validationsForContacts");

module.exports = {
  validateAuth,
  autenticate,
  upload,
  validateContacts,
};
