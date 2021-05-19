const jwt = require('jsonwebtoken')
const jwtSecret = require ('../../config/').jwtSecret

const isLoggedIn = (req, res, next) => {
    const token = req.headers['x-access-token']

    if(!token){
        res.send({
            message: "Wrong access token!"
        })
    }

    else{
        try {
            const payload = jwt.verify(token, jwtSecret)
            req.body.id = payload.data._id
            next()
        }
        catch(error) {
            res.send({
                message: error.message
            })
        }
    }   
}

module.exports = isLoggedIn