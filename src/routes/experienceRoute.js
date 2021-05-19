const express = require('express')
const router = express.Router()
const Profile = require('../models/Profile')
const isLoggedIn = require('../middleware')
const user = require('../models/User')

router.put('/addexperience', isLoggedIn, (req, res) => {
    Profile.findOne({userId: req.body.userid}).then((data) => {
        if(data){
            data.experience.push({
                jobTitle: req.body.jobTitle,
                company: req.body.company,
                location: req.body.location,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate,
                jobDescription: req.body.jobDescription
            })
            data.save().then((data) => {
                res.send({
                    message: "experience added successfully!",
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


router.delete('/deleteexperience', isLoggedIn, (req, res) => {
    Profile.findOne({userId: req.body.userId}).then((data) => {
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
                return req.body.expId !== experience._id.toString() 
            })

            data.save().then((data) => {
                res.send({
                    message: "Experience deleted successfully!",
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