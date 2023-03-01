var express = require("express");
var router = express.Router();
var Client = require("../models/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


let signup =  async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  let client = new Client({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    birthdate: req.body.birthdate,
    profileimg: req.body.profileimg,
    joined: req.body.joined,
  });
  client = await client.save((err)=>{
    res.status(500).send({ message: err });
  });
  res.send(client)
//   client.save((err) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     } else {
//       res.send({ message: "Client was registered successfully!" });
//     }
//   });
};

let login =  async (req, res) => {
  let client = await Client.findOne({ email: req.body.email });
  if (!client) return res.status(400).send("Invalid Email or Password");
  const validPassword = await bcrypt.compare(
    req.body.password,
    client.password
  );
  if (!validPassword || client.email != req.body.email)
    return res.status(400).send("Invalid Username or Password");
  const token = jwt.sign({ _id: client._id }, "EcoFitPrivateKey");
  res.send(token);
};
module.exports = {signup,login};
