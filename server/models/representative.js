const mongoose = require("mongoose");
const representativeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },    
    lastname: {
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
    },brandid : {
        type : Number,
        require : true
    },
    brandname : {
        type : String,
        require : true
    }

})
module.exports = mongoose.model('representative', representativeSchema);