
const Contact = require('../Model/contactschema');


async function getAllContacts(req, res) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching contacts' });
  }
}


async function getContactById(req, res) {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching contact' });
  }
}


async function createContact(req, res) {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    const newContact = new Contact({ name, email, phone });
    const saved = await newContact.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Server error while creating contact' });
  }
}


async function updateContact(req, res) {
  try {
    const { name, email, phone } = req.body;
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Contact not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error while updating contact' });
  }
}


async function deleteContact(req, res) {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while deleting contact' });
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
