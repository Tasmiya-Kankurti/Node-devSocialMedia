const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Profile = require('../models/Profile')
const Post = require('../models/Post')
const isLoggedIn = require('../middleware')
const gravatar = require('gravatar')
const normalize =require('normalize-url')

router.get('/', (req, res) => {
    User.find().then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send({
            message: error.messge,
        })
        
    })
})

router.get('/myaccount', isLoggedIn, (req, res) => {
    User.findOne({_id: req.body.id}).select('-password').then((data) => {
        console.log(data)
        res.send(data)
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })

})

router.post('/createuser', (req, res) => {
    User.findOne({email: req.body.email}).then((data) => {
        if(data){
            res.send({
                message: "User account already exists from this email!"
            })
        } else {
            const avatar = normalize(
                gravatar.url(req.body.email, {
                  s: '200',
                  r: 'pg',
                  d: 'mm'
                }),
                { forceHttps: true }
              );

            const user = new User({
                avatar: avatar, 
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            
            user.save().then((data) => {
                res.send({
                    message: "User account created successfully!",
                    ...data._doc
                })
            }).catch((error) => {
                res.send({
                    message: error.message
                })
            })
        }
    })
})


router.delete('/deleteuser', isLoggedIn, (req, res) => {
    User.remove({_id: req.body.id}).then((data) => {
        Profile.remove({userId: req.body.id}).then((pdata) => {
            Post.remove({userId: req.body.id}).then((tdata) => {
                // console.log(pdata)
                res.send({
                    message:"User account deleted successfully!"
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
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})

router.put('/forgetpassword', (req,res) => {
    User.updateOne(
        {
            email: req.body.email
        },
        {
            $set: {
                password: req.body.password,
                confirm: req.body.password
            }
        }
    ).then((data) => {
        res.send({
            message: "Password updated successfully!"
        })
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})

module.exports = router