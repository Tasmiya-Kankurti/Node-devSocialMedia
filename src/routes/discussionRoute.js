const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const isLoggedIn = require('../middleware')
const User = require('../models/User')

router.put('/addcomment', isLoggedIn, (req, res) => {
    User.findOne({_id: req.body.id}).then((udata) => {
        Post.findOne({_id: req.body.posId}).then((data) => {
            if(data){
                data.discussion.push({
                    comment: req.body.comment,
                    userName: udata.name,
                    avatar: udata.avatar,
                    cmntUsrId: req.body.id
                })
                data.save().then((data) => {
                    res.send({
                        message: "Comment added successfully!",
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
                res.status(400).send({
                    error: {
                        message: "Wrong post ID!"
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
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.message
            }
        })
    })
})


router.delete('/deletecomment', isLoggedIn, (req, res) => {
    Post.findOne({_id: req.body.posId}).then((data) => {
        if(data){
            var flag =0 
            data.discussion.map((tracePost,i) => {
                if(req.body.disId === tracePost._id.toString() && req.body.id === tracePost.cmntUsrId.toString()){
                    // console.log("Inside if ")
                    flag=1
                    data.discussion.splice(i, 1); 
                }     
            })
            data.save().then((data) => {
                if( flag ===1 ){
                    res.send({
                        message: "Comment deleted successfully!",
                        ...data._doc
                    })
                } else {
                    res.status(401).send({
                        error:{
                            message: "wrong commented user!"
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
        } else {
            res.status(400).send({
                error:{
                    message: "Wrong Post Id"
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