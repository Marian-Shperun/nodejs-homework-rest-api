const mongoose = require("mongoose");
const Contacts = require("../models/contacts.js");

const listContacts = async (req, res) => {
  try {
    // data current user
    const { _id: owner } = req.user;
    // pagination
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contacts.find({ owner }, "-createdAt", {
      skip,
      limit,
    }).populate("owner", "email");

    res.status(200).json({ list_contacts: contacts });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong` });
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  // checkId(req, res, "Not found", contactId);

  if (!mongoose.isValidObjectId(contactId))
    return res.status(404).json({ message: "Not found" });

  try {
    const getOneContact = await Contacts.findById(contactId);
    if (!getOneContact) return res.status(404).json({ message: "Not found" });
    res.status(200).json(getOneContact);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  if (!mongoose.isValidObjectId(contactId))
    return res.status(404).send(`No contact  with id: ${contactId}`);

  try {
    const id = await Contacts.findById(contactId);
    if (!id) return res.status(404).send(`No contact  with id: ${contactId}`);

    await Contacts.findByIdAndRemove(contactId);
    res.status(200).json({ message: "contact deleted", deleted_contact: id });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const addContact = async (req, res) => {
  const body = req.body;
  const { _id: owner } = req.user;
  try {
    if (!Object.values(body).length) {
      return res.status(400).json({ message: "missing fields" });
    }

    const newContact = new Contacts({
      ...body,
      owner,
    });

    await newContact.save();
    res.status(201).json({ new_contact: newContact });
  } catch (e) {
    res.status(404).json({ message: `Not found, ${e.message}` });
  }
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  try {
    const id = await Contacts.findById(contactId);

    if (!id) return res.status(404).send(`No contact  with id: ${contactId}`);

    const updatedContacts = await Contacts.findByIdAndUpdate(
      contactId,
      { ...body, contactId },
      {
        new: true,
      }
    );

    res.status(200).json(updatedContacts);
  } catch (e) {
    res.status(404).json({ message: `Not found, ${e.message}` });
  }
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  if (!Object.values(body).length)
    return res.status(400).json({
      message: `missing field favorite`,
    });

  try {
    const updatedFavorite = await Contacts.findByIdAndUpdate(
      contactId,
      { ...body, contactId },
      {
        new: true,
      }
    );

    res.status(200).json(updatedFavorite);
  } catch (e) {
    res.status(404).json({ message: `":" Not found , ${e.message}` });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
