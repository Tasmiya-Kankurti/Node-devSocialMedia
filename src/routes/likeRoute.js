const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const isLoggedIn = require('../middleware')
const user = require('../models/User')

router.put('/addlike', isLoggedIn, (req, res) => {
    Post.findOne({_id: req.body.posId}).then((data) => {
        if(data){
            var flag=0
            data.likes.map((traceUser,i) => {
                // console.log("tracer: "+traceUser)
                if(req.body.likedUser === traceUser.likedUser.toString()){
                    // console.log("Inside if ")
                    flag=1
                }
            })
            if(flag === 0){
                data.likes.push({
                    likedUser: req.body.id
                })
                data.save().then((data) => {
                    res.send({
                        message: "like added successfully!",
                        ...data._doc
                    } )
                }).catch((error) => {
                    res.send({
                        message: error.message
                    })
                })
            } else {
                res.send({
                    message: "You have already liked the post!",
                    ...data._doc
                })    
            }
        } else {
            res.send({
                message: "Wrong post ID!"
            })
        }
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})


router.delete('/deletelike', isLoggedIn, (req, res) => {
    Post.findOne({_id: req.body.posId}).then((data) => {
        if(data){
            var flag =0 
            data.likes.map((traceLikes,i) => {
                if(req.body.likId === traceLikes._id.toString() && req.body.id === traceLikes.likedUser.toString()){
                    // console.log("Inside if ")
                    flag=1
                    data.likes.splice(i, 1); 
                }     
            })
            data.save().then((data) => {
                if( flag ===1 ){
                    res.send({
                        message: "Like deleted successfully!",
                        ...data._doc
                    })
                } else {
                    res.send({
                        message: "wrong liked user or wrong like Id!"
                    })
                }
            }).catch((error) => {
                res.send({
                    message: error.message
                })
            })
        } else {
            res.send( " no")
        }
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})


module.exports = router