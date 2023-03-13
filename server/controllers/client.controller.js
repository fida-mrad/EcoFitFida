const express = require('express');
const router = express.Router();
const Client = require('../models/client');

// GET all clients
const client_GET_ALL = async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one client
const client_GET_ONE = async (req, res, next) => {
    let client;
    try {
      client = await Client.findById(req.params.id);
      if (client == null) {
        return res.status(404).json({ message: 'Cannot find client' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.client = client;
    next();
  }

// POST a new client
const client_POST = async (req, res) => {
  const client = new Client({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    birthdate: req.body.birthdate,
    profileimg: req.body.profileimg,
    confirmed: req.body.confirmed,
    cart: req.body.cart,
    tfaSecret: req.body.tfaSecret,
    tfa: req.body.tfa,
    role: req.body.role
  });
  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Exporting all controllers
module.exports = {
    client_GET_ALL,
    client_GET_ONE,
    client_POST,
}