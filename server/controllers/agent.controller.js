const Agent = require("../models/agent");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config");
const transporter = require("../middleware/transporter");
const _ = require("lodash");
const mongoose = require('mongoose');
require("dotenv").config();

const agentController = {
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, password, profileimg, brand } =
        req.body;

      if (
        !firstname ||
        !lastname ||
        !brand ||
        !profileimg ||
        !email ||
        !password
      )
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });

      const agent = await Agent.findOne({ email });
      if (agent) return res.status(400).json({ msg: "Agent already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);

      const newAgent = new Agent({
        firstname,
        lastname,
        profileimg,
        email,
        password: passwordHash,
        brand: brand,
      });
      //Create Email Verification Token
      jwt.sign(
        {
          agent: _.pick(newAgent, "id"),
        },
        process.env.ACTIVATION_TOKEN_SECRET,
        {
          expiresIn: "15m",
        },
        (err, emailToken) => {
          if (!err) {
            console.log("emailToken : " + emailToken);
            const url = `http://localhost:3000/agent/activate/${emailToken}`;

            transporter.sendMail({
              to: newAgent.email,
              subject: "Email Confirmation",
              html: `Please click this email to confirm your email: <a href="${url}">Click This Link</a>`,
            });
          } else {
            console.log("Email Error : " + err);
          }
        }
      );

      // Save mongodb
      await newAgent.save();
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
      const { agent } = jwt.verify(
        req.params.token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const { id } = agent;
      let confirmedAgent = await Agent.findOneAndUpdate(
        { _id: id },
        { confirmed: true },
        {
          returnOriginal: false,
        }
      );
      return res.status(200).send("Email Verified");
    } catch (e) {
      res.status(500).json({ e: e.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const agent = await Agent.findOne({ email });
      if (!agent)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, agent.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });
      if (!agent.confirmed) {
        return res.status(401).send({ msg: "Please Verify your Email" });
      } else {
        // If login success , create access token and refresh token
        // const accesstoken = createAccessToken({id: agent._id})
        const refreshtoken = createRefreshToken({ id: agent._id, role : agent.role });

        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          path: "/admin/refresh_token",
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

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, agent) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });

        const accesstoken = createAccessToken({ id: agent.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  approve: async (req, res) => {
    const agentId = req.body.id;
    if(!agentId||!mongoose.Types.ObjectId.isValid(agentId)) return res.status(400).send('Agent Not Specified');
    let approvedAgent = await Agent.findOneAndUpdate(
        { _id: agentId },
        { approved: true },
        {
          returnOriginal: false,
        }
      );
      if(!approvedAgent) return res.status(400).send('Agent Not Found');
      return res.status(200).send("Brand Agent Approved");
  },
};
const createAccessToken = (agent) => {
  return jwt.sign(agent, config.ACCESS_TOKEN_SECRET, { expiresIn: "11d" });
};
const createRefreshToken = (agent) => {
  return jwt.sign(agent, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
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
module.exports = agentController;
