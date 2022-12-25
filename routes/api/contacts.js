const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.js");

const {
  contactValidation,
  contactUpdateValidation,
} = require("../../middlewares/validationsForContacts.js");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", contactValidation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", contactUpdateValidation, updateContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
