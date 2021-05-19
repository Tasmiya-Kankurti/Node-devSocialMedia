const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
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
            comments: {
                type: String,
            required: true
            }
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

    disLikes: [
        {
            disLikedUser: {
                type: Schema.Types.ObjectId,
                required: true
            }
        }
    ]
        

})

const post = mongoose.model("post", postSchema)
module.exports = post