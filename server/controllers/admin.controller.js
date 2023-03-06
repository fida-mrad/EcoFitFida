var Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config");
const _ = require("lodash");
require("dotenv").config();

const adminController = {
  addAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });
      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid Email." });
      const admin = await Admin.findOne({ email: email });
      if (admin) return res.status(400).json({ msg: "Admin already exists." });
      const passwordHash = await bcrypt.hash(password, 10);

      const newAdmin = new Admin({
        profileimg,
        email,
        password: passwordHash,
      });
      await newAdmin.save();
      return res
        .status(201)
        .json({ message: "New Admin Added Successfully !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ msg: "Unauthorized" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Incorrect Credentials." });
      const refreshtoken = createRefreshToken({ id: admin._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/admin/refresh_token",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1d
      });
      res.json({ msg: "Login success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/admin/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, client) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });

        const accesstoken = createAccessToken({ id: client.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
const createAccessToken = (client) => {
  return jwt.sign(client, config.ACCESS_TOKEN_SECRET, { expiresIn: "11d" });
};
const createRefreshToken = (client) => {
  return jwt.sign(client, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
module.exports = adminController;
