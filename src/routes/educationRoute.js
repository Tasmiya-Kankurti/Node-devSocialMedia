const express = require('express')
const router = express.Router()
const Profile = require('../models/Profile')
const isLoggedIn = require('../middleware')
const user = require('../models/User')

router.put('/addeducation', isLoggedIn, (req, res) => {
    Profile.findOne({userId: req.body.id}).then((data) => {
        if(data){
            data.education.push({
                school: req.body.school,
                degree: req.body.degree,
                field: req.body.field,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate,
                currentSchool: req.body.currentSchool,
                discription: req.body.discription
            })
            data.save().then((data) => {
                res.send({
                    message: "education added successfully!",
                    ...data._doc
                } )
            }).catch((error) => {
                res.status(500).send({
                    error: {
                        message: error.message
                    }
                })
            })
        } else {
            res.status(401).send({
                error: {
                    message: "Wrong user ID!"
                }
            })
        }
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})


router.delete('/deleteeducation/:eduId', isLoggedIn, (req, res) => {
    Profile.findOne({userId: req.body.id}).then((data) => {
        if(data){
            
            data.education = data.education.filter((education) => {
                return req.params.eduId !== education._id.toString() 
            })

            data.save().then((data) => {
                res.send({
                    message: "Education deleted successfully!",
                    ...data._doc
                })
            }).catch((error) => {
                res.status(500).send({
                    error: {
                        message: error.message
                    }
                })
            })

        } else {
            res.status(401).send({
                error: {
                    message:"Wrong user ID!"
                }
            })
        }
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})


module.exports = router