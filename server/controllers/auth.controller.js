var Client = require("../models/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config");
const transporter = require("../middleware/transporter");
const _ = require("lodash");
require("dotenv").config();

const clientController = {
  register: async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        username,
        email,
        password,
        phone,
        birthdate,
        profileimg,
      } = req.body;

      if (
        !firstname ||
        !lastname ||
        !username ||
        !phone ||
        !birthdate ||
        !profileimg ||
        !email ||
        !password
      )
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });

      const client = await Client.findOne({
        $or: [{ email: email }, { username: username }],
      });
      if (client)
        return res.status(400).json({ msg: "Client already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);

      const newClient = new Client({
        firstname,
        lastname,
        username,
        phone,
        birthdate,
        profileimg,
        email,
        password: passwordHash,
      });
      jwt.sign(
        {
          client: _.pick(newClient, "id"),
        },
        process.env.ACTIVATION_TOKEN_SECRET,
        {
          expiresIn: "15m",
        },
        (err, emailToken) => {
          if (!err) {
            console.log("emailToken : " + emailToken);
            const url = `http://localhost:3000/auth/activate/${emailToken}`;

            transporter.sendMail({
              to: newClient.email,
              subject: "Confirm Email",
              html: `Please click this email to confirm your email: <a href="${url}">Click This Link</a>`,
            });
          } else {
            console.log("Email Error : " + err);
          }
        }
      );

      // Save mongodb
      await newClient.save();

      return res
        .status(201)
        .json({
          msg: "Register Success! Please activate your email to start.",
        });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  confirmEmail: async (req, res) => {
    try {
      const { client } = jwt.verify(
        req.params.token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const { id } = client;
      let updatedUser = await Client.findOneAndUpdate(
        { _id: id },
        { confirmed: true },
        {
          returnOriginal: false,
        }
      );
      return res.status(200).send("Email Verified");
          // return res.redirect("http://localhost:3000/users/login");
    } catch (e) {
      res.status(500).json({ e: e.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const client = await Client.findOne({ email });
      if (!client)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, client.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });
      if (!client.confirmed) {
        return res.status(401).send({ msg: "Please Verify your Email" });
      } else {
        // If login success , create access token and refresh token
        // const accesstoken = createAccessToken({id: client._id})
        const refreshtoken = createRefreshToken({ id: client._id,role : client.role });
        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          path: "/auth/refresh_token",
          maxAge: 1 * 24 * 60 * 60 * 1000, // 7d
        });

        res.json({ msg: "Login success!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/auth/refresh_token" });
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
  getUser: async (req, res) => {
    try {
      const client = await Client.findById(req.client.id).select("-password");
      if (!client) return res.status(400).json({ msg: "User does not exist." });

      res.json(client);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getClient: async (req, res) => {
    // Get the token from the cookie
    const token = req.cookies.refreshtoken;

    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }
    try {
      // Verify the token and extract the user ID
      const { id } = jwt.verify(token, config.REFRESH_TOKEN_SECRET);

      // Get the user profile based on the ID
      const loggedInClient = await Client.findById(id);

      // Return the user profile
      res.json(
        _.pick(loggedInClient, ["firstname", "lastname", "email", "username"])
      );
    } catch (err) {
      console.log(err);
      // Invalid token
      res.status(401).send("Invalid Token");
    }
  },
};
const createAccessToken = (client) => {
  return jwt.sign(client, config.ACCESS_TOKEN_SECRET, { expiresIn: "11d" });
};
const createRefreshToken = (client) => {
  return jwt.sign(client, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
const createActivationToken = (payload) => {
  return jwt.sign({ payload }, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
module.exports = clientController;
