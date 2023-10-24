const mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true,"Please add user name"],
    },
    email : {
        type : String,
        required : [true,"Please add contact email address"],
        unique : [true,"Email already exists"]
    },
    password : {
        type : String,
        required : [true,"Please add user password"],
    },
},
    {
        timestamps : true,
    }
);

module.exports= mongoose.model('User',userSchema);