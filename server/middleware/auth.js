const jwt = require('jsonwebtoken')
const config = require('../controllers/config');
const authAdmin = async (req, res, next) =>{
    const token = req.cookies.refreshtoken;
    console.log(token);
    if (!token) {
      return res.status(401).send("Unauthorized, No Token");
    }
    try {
      const { id,role,exp } = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
      if(role!="Admin") return res.status(403).send("Access Denied");
      req.body.id = id;
      req.body.exp = exp;
      req.body.role = role;
      next();
    } catch (ex) {
      // Invalid token
      res.status(401).send("Unauthorized");
    }
}
const authClient = async (req, res, next) =>{
    const token = req.cookies.refreshtoken;
    if (!token) {
      return res.status(401).send("Unauthorized , No Token Found");
    }
    try {
      const { id,role,exp } = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
      if(role!="Client") return res.status(403).send("Access Denied");
      req.body.id = id;
      req.body.exp = exp;
      req.body.role = role;
      next();
    } catch (ex) {
      res.status(401).send("Unauthorized");
    }
}
const authAgent = async (req, res, next) =>{
    const token = req.cookies.refreshtoken;

    if (!token) {
      return res.status(401).send("Unauthorized, No Token Found");
    }
    try {
      const { id,role,exp } = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
      if(role!="Agent") return res.status(403).send("Access Denied");
      req.body.id = id;
      req.body.exp = exp;
      req.body.role = role;
      next();
    } catch (ex) {
      res.status(401).send("Unauthorized");
    }
}

module.exports = {authAdmin,authClient,authAgent}