const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");
//@description Get all contacts
//@route GET /api/contacts
//@acess private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.json(contacts);
});

//@description create contacts
//@route POST /api/contacts
//@acess private

const createContacts = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, email, phone } = req.body;

  const newContact = new Contact({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  newContact
    .save()
    .then((savedContact) => {
      console.log("Contact saved:", savedContact);
    })
    .catch((error) => {
      console.error("Error saving contact:", error);
    });

  res.json(newContact);
});

//@description get contact
//@route GET /api/contacts/:id
//@acess private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.json(contact);
});

//@description update contact
//@route PUT /api/contacts/:id
//@acess private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString() !== req.user_id)
  {
    res.status(403);
    throw new Error("User can't update other users information");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedContact);
});

//@description delete contact
//@route DELETE /api/contacts/:id
//@acess private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString() !== req.user_id)
  {
    res.status(403);
    throw new Error("User can't deleete other user!");
  }

  await contact.deleteOne({_id:req.params.id});
  res.json(deleteContact);
});

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
};
