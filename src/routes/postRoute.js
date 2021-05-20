const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const isLoggedIn = require('../middleware')
const User = require('../models/User')


router.get('/', (req, res) => {
    Post.find().then((data) => {
        res.send(data)
    }).catch((eror) => {
        res.send({
            message: error.messge,
        })
        
    })
})

router.post('/createpost', isLoggedIn, (req, res) => {
    User.findOne({_id: req.body.id}).then((data) => {
        const post = new Post({
            userId: req.body.id,
            userName: data.name,
            avatar: data.avatar,
            text: req.body.text,
        }) 
        post.save().then((data) => {
            res.send({
                message: "Post created successfully!",
                ...data._doc
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

router.delete('/deletepost', isLoggedIn, (req, res) => {
    Post.remove({_id: req.body.posId, userId: req.body.id}).then((data) => {
        if(data.deleteCount === 0) {
            res.send({
                message:"Post deleted successfully!"
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