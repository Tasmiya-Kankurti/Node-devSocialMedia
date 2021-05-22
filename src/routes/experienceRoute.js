const express = require('express')
const router = express.Router()
const Profile = require('../models/Profile')
const isLoggedIn = require('../middleware')
const user = require('../models/User')

router.put('/addexperience', isLoggedIn, (req, res) => {
    Profile.findOne({userId: req.body.id}).then((data) => {
        if(data){
            data.experience.push({
                jobTitle: req.body.jobTitle,
                company: req.body.company,
                location: req.body.location,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate,
                jobDescription: req.body.jobDescription,
                currentJob: req.body.currentJob  
            })
            data.save().then((data) => {
                res.send({
                    message: "experience added successfully!",
                    ...data._doc
                } )
            }).catch((error) => {
                res.status(500).send({
                    error:{
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


router.delete('/deleteexperience/:expId', isLoggedIn, (req, res) => {
    Profile.findOne({userId: req.body.id}).then((data) => {
        if(data){
            // console.log("expID: "+req.body.expId)
            // data.experience.map((traceUser,i) => {
                
            //     console.log("tracer: "+traceUser._id)
            //     if(req.body.expId === traceUser._id.toString()){
            //         console.log("Inside if ")
            //         data.experience.splice(i, 1); 
            //     }
                    
            // })

            data.experience = data.experience.filter((experience) => {
                return req.params.expId !== experience._id.toString() 
            })

            data.save().then((data) => {
                res.send({
                    message: "Experience deleted successfully!",
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
            error:{
                message: error.message
            }
        })
    })
})


module.exports = router