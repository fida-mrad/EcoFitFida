const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema({
    reason: {
        type: String,
        require: true
    },    
    date : {
        type: Date,
        require: true,
        default : Date.now()
    },
    status : {
        type : Boolean,
        require : true
    },

})
module.exports = mongoose.model('complaint', complaintSchema);