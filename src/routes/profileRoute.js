const express = require('express')
const router = express.Router()
const Profile = require('../models/Profile')
const isLoggedIn = require('../middleware')

router.get('/', (req, res) => {
    Profile.find().populate('userId',['name', 'email','avatar']).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })

})

router.get('/myprofile', isLoggedIn, (req, res) => {
    Profile.findOne({userId: req.body.id}).populate('userId',['name', 'email','avatar']).then((data) => {
        if(data)
            res.send(data)
        else{
            res.status(400).send({
                error:{
                message: "There is No profile Available"
                }
                })
        }
        // console.log(data)
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })

})
router.get('/profileById/:userId', (req, res) => {
    Profile.findOne({userId: req.params.userId}).populate('userId',['name', 'email','avatar']).then((data) => {
        if(data){
            // console.log(data)
            res.send(data)
        } else {
            res.status(400).send({
                error: {
                    message: "There is No profile Available"
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

router.post('/createprofile', isLoggedIn, (req, res) => {
    Profile.findOne({userId: req.body.id}).then((data) => {
        if(data){

            const profileData = {
                userId: req.body.id,
                career: req.body.career,
                work: req.body.work,
                companyWebsite: req.body.companyWebsite,
                citystate: req.body.citystate,
                skills: Array.isArray(req.body.skills)
                    ? req.body.skills
                    : req.body.skills.split(',').map((skill) => ' ' + skill.trim()),
                gitName: req.body.gitName,
                about: req.body.about,
                social:{
                    twitter: req.body.twitter,
                    facebook: req.body.facebook,
                    youtube: req.body.youtube,
                    linkedin: req.body.linkedin,
                    instagram:req.body.instagram
                }
            }
            
            Profile.updateOne(
                {
                    _id: data._id
                },
                {
                    $set: profileData
                }
            ).then((data) => {
                Profile.findOne({userId: req.body.id}).then((value) => {
                    if(value !== null)
                        res.send({
                            message: "Profile updated successfully!",
                            ...value._doc
                        })
                }).catch((error) => {
                    res.status(500).send({
                        error: {
                            message: error.message
                        }     
                    })
                })
            }).catch((error) => {
                res.status(500).send({
                    error: {
                        message: error.message
                    }
                })
            })
        } else {
            // console.log("in create")
            const profile = new Profile({
                userId: req.body.id,
                career: req.body.career,
                work: req.body.work,
                companyWebsite: req.body.companyWebsite,
                citystate: req.body.citystate,
                skills: Array.isArray(req.body.skills)
                    ? req.body.skills
                    : req.body.skills.split(',').map((skill) => ' ' + skill.trim()),
                gitName: req.body.gitName,
                about: req.body.about,
                social:{
                    twitter: req.body.twitter,
                    facebook: req.body.facebook,
                    youtube: req.body.youtube,
                    linkedin: req.body.linkedin,
                    instagram:req.body.instagram
                }
            }) 
            profile.save().then((data) => {
                res.send({
                    message: "Profile created successfully!",
                    ...data._doc
                })
            }).catch((error) => {
                res.status(500).send({
                    error: {
                        message: error.message
                    }
                })
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