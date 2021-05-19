const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const jwtSecret = require('../../config/').jwtSecret
const User = require('../models/User')

router.get('/', (req, res) => {
    // console.log(jwtSecret)
    User.findOne({email: req.body.email, password: req.body.password}).then((data) => {
        if(data){
            //create accessToken
            const accessToken = jwt.sign({
                data: {
                    _id: data._id
                }
            }, jwtSecret)
            res.send({
                accessToken,
                ...data._doc
            })
        } else {
            res.send({
                message: "Wrong email and password!"
            })
        }
    }).catch((error) => {
        // console.log("error")
        res.send({
            message: error.message,
        })
    })
})

module.exports = router