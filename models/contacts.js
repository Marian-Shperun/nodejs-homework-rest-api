const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (e) {
    return e.message;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    console.log(contact);
    if (!contact) {
      return null;
    }
    return JSON.parse(JSON.stringify(contact));
  } catch (e) {
    return e.message;
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removesContact = contacts.find((contact) => contact.id === contactId);
  // console.log(removesContact);
  if (!removesContact) {
    return null;
  }
  const index = contacts.findIndex((contact) => contact.id === contactId);
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return JSON.parse(JSON.stringify(removesContact));
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      ...body,
    };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return JSON.parse(JSON.stringify(newContact));
  } catch (e) {
    return e.message;
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const сhangeСontact = contacts.map((contact) =>
    contact.id === contactId ? { ...contact, ...body } : contact
  );
  await fs.writeFile(contactsPath, JSON.stringify(сhangeСontact, null, 2));

  const findContact = сhangeСontact.find((contact) => contact.id === contactId);

  return JSON.parse(JSON.stringify(findContact));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
