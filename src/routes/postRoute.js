const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const isLoggedIn = require('../middleware')


router.get('/', (req, res) => {
    Post.find().then((data) => {
        res.send(data)
    }).catch((eroor) => {
        res.send({
            message: error.messge,
        })
        
    })
})

router.post('/createpost', isLoggedIn, (req, res) => {
    const post = new Post({
        userId: req.body.id,
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
        
})

router.delete('/deletepost', isLoggedIn, (req, res) => {
    Post.remove({_id: req.body.posId, userId: req.body.id}).then((data) => {
        res.send({
            message:"Post deleted successfully!"
        })
    }).catch((error) => {
        res.send({
            message: error.message
        })
    })
})



module.exports = router