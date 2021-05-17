const express = require('express')
const router = express.Router()
const Profile = require('../models/Profile')

router.get('/', (req, res) => {
    Profile.find().then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })

})

router.post('/createprofile', (req, res) => {
    Profile.findOne({email: req.body.email}).then((data) => {
        if(data){
            res.send({
                message: "User have already created hi profile, you can update it..."
            })
        } else {
            const profile = new Profile({
                career: req.body.career,
                work: req.body.work,
                companyWebsite: req.body.companyWebsite,
                citystate: req.body.citystate,
                skills: req.body.skills,
                gitName: req.body.gitName,
                about: req.body.about,
                twitter: req.body.twitter,
                facebook: req.body.facebook,
                youtube: req.body.youtube,
                linkedIn: req.body.linkedIn,
                instagram:req.body.instagram,
            }) 
            profile.save().then((data) => {
                res.send({
                    message: "Profile created successfully!",
                    ...data._doc
                })
            }).catch((error) => {
                res.send({
                    message: error.message
                })
            })
        }
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})

router.put('/updateprofile', (req, res) => {
    Profile.updateOne(
        {
            _id: req.body.id
        },
        {
            $set: {
                ...req.body
            }
        }
    ).then((data) => {
        Profile.findOne({_id: req.body.id}).then((data) => {
            if(data !== null)
                res.send({
                    message: "Profile updated successfully!"
                })
        }).catch((error) => {
            res.send({
                message: error.message     
            })
        })
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})

module.exports = router