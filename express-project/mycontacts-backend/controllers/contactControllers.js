const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel.js');
//@description Get all contacts 
//@route GET /api/contacts
//@acess public

const getContacts = asyncHandler( async(req, res) =>{
    const contacts = await Contact.find();
    res.json(contacts);
}); 

//@description create contacts 
//@route POST /api/contacts
//@acess public

const createContacts = asyncHandler( async(req, res) =>{
    console.log(req.body);

    const {name,email,phone} = req.body;

    if(!name || !email || !phone)
    {
        res.status(404);
        throw new Error("All Feild are required");
    }
    
    const contact = await Contact.createContacts({
        name, 
        email, 
        phone
    });

    res.json(contact);
});

//@description get contact 
//@route GET /api/contacts/:id
//@acess public

const getContact = asyncHandler( async(req, res) =>{
    res.json({messege : `Get contact for ${req.params.id}`}); 
});

//@description update contact 
//@route PUT /api/contacts/:id
//@acess public

const updateContact = asyncHandler( async(req, res) =>{
    res.json({messege : `Update contact for ${req.params.id}`}); 
});

//@description delete contact 
//@route DELETE /api/contacts/:id
//@acess public

const deleteContact = asyncHandler( async(req, res) =>{
    res.json({messege : `Delete contact for ${req.params.id}`});
});

module.exports = {getContacts, createContacts,getContact,updateContact,deleteContact}; 