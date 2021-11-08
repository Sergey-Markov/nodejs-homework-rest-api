const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const getContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const listContacts = async () => {
  return await getContacts();
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const contact = contacts.find((contact) => {
    if (contact.id === String(contactId)) {
      return contact;
    } else {
      return null;
    }
  });
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const contact = contacts.find((contact) => {
    if (contact.id === String(contactId)) {
      return contact;
    } else {
      return null;
    }
  });
  const indexOfContact = contacts.indexOf(contact);
  contacts.splice(indexOfContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.table(contacts);
  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  const contacts = await getContacts();
  contacts.push(newContact);
  const dataToJSON = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, dataToJSON);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await getContacts();
  const contactIndex = contacts.findIndex((contact) => {
    if (contact.id === String(contactId)) return contact;
  });
  if (contactIndex === -1) {
    return null;
  }
  const prevContact = { ...contacts[contactIndex] };
  contacts[contactIndex] = { ...prevContact, ...body };

  const dataToJSON = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, dataToJSON);

  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
