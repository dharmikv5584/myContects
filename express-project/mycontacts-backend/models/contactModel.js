const mongoose  = require('mongoose');

const contactSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please add contact name"],
    },
    email : {
        type : String,
        required : [true,"Please add contact email address"],
    },
    phone : {
        type : String,
        required : [true,"Please add contact number"],
    },
},
    {
        timestamps : true,
    }
);

module.exports= mongoose.model('Contact',contactSchema);