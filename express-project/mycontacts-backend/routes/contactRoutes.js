 const express = require('express');
 const router = express.Router();
 const {getContacts, createContacts,getContact,updateContact,deleteContact} = require('../controllers/contactControllers');
const validationToken = require('../middelware/validatoinToken');
 
router.use(validationToken);  
router.route('/').get(getContacts)
router.route('/').post(createContacts) 
router.route('/:id').get(getContact)
router.route('/:id').put(updateContact)
router.route('/:id').delete(deleteContact) 

module.exports  = router;