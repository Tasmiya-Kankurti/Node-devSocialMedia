const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },

    userName: {
        type: String,
        requires: true
    },

    avatar: {
        type: String,
        requires: true
    },

    text: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    discussion: [
        {
            userName: {
                type: String,
                requires: true
            },

            avatar: {
                type: String,
                requires: true
            },

            cmntUsrId: {
                type: String,
                requires: true
            },

            comment: {
                type: String,
                required: true
            },

            date: {
                type: Date,
                default: Date.now
            },

        }
    ],

    likes: [
        {
            likedUser: {
                type: Schema.Types.ObjectId,
                required: true
            }
        }
    ],

        

})

const post = mongoose.model("post", postSchema)
module.exports = post