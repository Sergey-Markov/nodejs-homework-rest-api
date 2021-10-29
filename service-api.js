const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.resolve("./db/contacts.json");

const getContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

async function listContacts() {
  try {
    const contacts = await getContacts();
    console.table(contacts);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getContacts();
    contacts.find((contact) => {
      if (String(contact.id) === String(contactId)) {
        console.table(contact);
        return;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
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
    listContacts();
  } catch (error) {
    console.error(error);
  }
}
async function removeContact(contactId) {
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
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
