const express = require("express");
const contact = require("../../controllers/contacts.js");

const { validateContacts, autenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", autenticate, contact.listContacts);

router.get("/:contactId", autenticate, contact.getContactById);

router.post(
  "/",
  autenticate,
  validateContacts.contactValidation,
  contact.addContact
);

router.delete("/:contactId", autenticate, contact.removeContact);

router.put(
  "/:contactId",
  autenticate,
  validateContacts.contactUpdateValidation,
  contact.updateContact
);

router.patch("/:contactId/favorite", autenticate, contact.updateStatusContact);

module.exports = router;
