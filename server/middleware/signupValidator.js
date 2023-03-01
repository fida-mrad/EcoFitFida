var Client = require("../models/client");
const isEmpty=require('./isEmpty');
const validator=require("validator");


checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Client.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    // email
    Client.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! email is already in use!" });
        return;
      }
      next();
    });
  });
};

ValidateClient = (client)=>{
 let errors={}
    client.email= !isEmpty(client.email) ? client.email:""
    client.lastname= !isEmpty(client.lastname) ? client.lastname:""
    client.firstname= !isEmpty(client.firstname) ? client.firstname:""

    if(!validator.isEmail(client.email)){
        errors.email ="Format email required";
    }

    if(validator.isEmpty(client.email)){
        errors.email="Required"
    }
    if(validator.isEmpty(client.lastname)){
        errors.lastname="Required lastname"
    }
    if(validator.isEmpty(client.firstname)){
        errors.firstname="Required firstname"
    }
    return{
        errors:errors,
        isValid: isEmpty(errors)
    }
}
module.exports = {checkDuplicateUsernameOrEmail,ValidateClient};

