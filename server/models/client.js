const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },    
    lastname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password:{
        type : String,
        require : true
    },
    phone: {
        type: String,
        require: true
    },
    birthdate : {
        type : Date,
        require : true
    },
    profileimg: {
        type: String,
        require: true
    },
    joined : {
        type: Date,
        require: true,
        default : Date.now()
    },

})
module.exports = mongoose.model('client', clientSchema);