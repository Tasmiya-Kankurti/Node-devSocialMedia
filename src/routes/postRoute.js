const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const isLoggedIn = require('../middleware')
const User = require('../models/User')


router.get('/', (req, res) => {
    Post.find().then((data) => {
        res.send(data)
    }).catch((error) => {
        res.status(500).send({
            error: {
                message: error.messge,
            }
        })
        
    })
})

router.get('/postById/:posId', (req, res) => {
    Post.findOne({_id: req.params.posId}).then((data) => {
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

router.delete('/deletepost', isLoggedIn, (req, res) => {
    Post.remove({_id: req.body.posId, userId: req.body.id}).then((data) => {
        if(data.deleteCount === 0) {
            res.send({
                message:"Post deleted successfully!"
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