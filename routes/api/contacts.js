const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contacts.js");

const {
  contactValidation,
  contactUpdateValidation,
} = require("../../schemas/validationsForContacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: `Something went wrong` });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const getOneContact = await getContactById(contactId);

    if (!getOneContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(getOneContact);
  } catch (err) {
    res.status(500).json({ message: `Something went wrong` });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  const { error } = contactValidation(req.body);
  if (error) {
    const erorMessage = Object.values(error.message)
      .filter((el) => el !== '"')
      .join("");
    return res.status(400).send({ message: `${erorMessage} ` });
  }

  try {
    const newContact = await addContact({
      name,
      email,
      phone,
    });
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: `Something went wrong` });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deletedСontact = await removeContact(contactId);

    if (!deletedСontact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "contact deleted", deletedСontact });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong` });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const { error } = contactUpdateValidation(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    if (!Object.values(body).length) {
      return res.status(400).json({ message: "missing fields" });
    }
    const response = await updateContact(contactId, req.body);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: `Not found` });
  }
});

module.exports = router;
