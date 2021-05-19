const express = require('express')
const router = express.Router()
const Profile = require('../models/Profile')
const isLoggedIn = require('../middleware')
const user = require('../models/User')

router.put('/addeducation', isLoggedIn, (req, res) => {
    Profile.findOne({userId: req.body.userId}).then((data) => {
        if(data){
            data.education.push({
                school: req.body.school,
                degree: req.body.degree,
                years: req.body.years
            })
            data.save().then((data) => {
                res.send({
                    message: "education added successfully!",
                    ...data._doc
                } )
            }).catch((error) => {
                res.send({
                    message: error.message
                })
            })
        } else {
            res.send({
                message: "Wrong user ID!"
            })
        }
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})


router.delete('/deleteeducation', isLoggedIn, (req, res) => {
    Profile.findOne({userId: req.body.userId}).then((data) => {
        if(data){
            
            data.education = data.education.filter((education) => {
                return req.body.eduId !== education._id.toString() 
            })

            data.save().then((data) => {
                res.send({
                    message: "Education deleted successfully!",
                    ...data._doc
                })
            }).catch((error) => {
                res.send({
                    message: error.message
                })
            })

        } else {
            res.send({
                message:"Wrong user ID!"
            })
        }
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})


module.exports = router