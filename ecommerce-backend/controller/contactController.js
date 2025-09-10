import Contact from '../models/Contact.js';

export const createContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const contact = new Contact({ name, email, subject, message });
    const createdContact = await contact.save();
    res.status(201).json(createdContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};