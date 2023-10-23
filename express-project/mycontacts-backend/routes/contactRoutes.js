 const express = require('express');
 const router = express.Router();
 const {getContacts, createContacts,getContact,updateContact,deleteContact} = require('../controllers/contactControllers');
 
router.route('/').get(getContacts)
router.route('/create').post(createContacts) 
router.route('/:id').get(getContact)
router.route('/:id').put(updateContact)
router.route('/:id').delete(deleteContact) 

module.exports  = router;