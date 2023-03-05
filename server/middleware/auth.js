const jwt = require('jsonwebtoken')
const config = require('../controllers/config');
const auth = (req, res, next) =>{
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication"})

        jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, client) =>{
            if(err) return res.status(400).json({msg: "Invalid Authentication"})

            req.client = client
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth