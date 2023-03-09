const {Schema, model} = require ('mongoose')

const userShema = new Schema(
{
    name :{
        type : String ,
        required : [true , "Please enter your name"],
        trim: true
    },
    email:{
        type : String ,
        required : [true , "Please enter your email"],
        trim: true ,
        unique : true


    },
    password:{
        type : String ,
        required : [true , "Please enter your password"],
        trim: true ,
        unique : true
    },
    avatar:{
        type : String ,
        default : ""
    }

}, {timestamp: true}
)
const User = model("User", userShema);

module.exports = User ;