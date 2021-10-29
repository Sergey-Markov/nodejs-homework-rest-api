const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.resolve(__dirname, "./contacts.json");

// const contacts = require('./contacts.json')

const getContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const listContacts = async () => {
  try {
    const contacts = await getContacts();
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContacts();
    const contact = contacts.find((contact) => {
      if (String(contact.id) === String(contactId)) {
        return contact;
      } else {
        return null;
      }
    });
    return contact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await getContacts();
    const contact = contacts.find((contact) => {
      if (String(contact.id) === String(contactId)) {
        return contact;
      }
    });
    const indexOfContact = contacts.indexOf(contact);
    contacts.splice(indexOfContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    listContacts();
  } catch (error) {
    console.error(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  try {
    const contacts = await getContacts();
    contacts.push(newContact);
    const dataToJSON = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, dataToJSON, (err) => {
      if (err) throw err;
    });
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await getContacts();
  const contactIndex = contacts.findIndex((contact) => {
    if (Number(contact.id) === Number(contactId)) return contact;
  });
  if (contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = { id: contactId, ...body };

  const dataToJSON = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, dataToJSON, (err) => {
    if (err) throw err;
  });

  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
