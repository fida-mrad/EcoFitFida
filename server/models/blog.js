const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },    
    description: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    images: {
        type: [String],
        require: true
    },
    author:{
        type : String,
        require : true
    },
    date : {
        type: Date,
        require: true,
        default : Date.now()
    },

})
module.exports = mongoose.model('blog', blogSchema);