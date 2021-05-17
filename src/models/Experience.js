const mongoose = require('mongoose')
const Schema = mongoose.Schema

const experienceSchema = new Schema({
    jobTitle: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true 
    },

    location: {
        type: String,
        required: false 
    },

    fromDate: {
        type: String,
        required: false 
    },

    toDate: {
        type: String,
        required: true 
    },

    jobDescription: {
        type: String,
        required: false
    }
}) 

const experience = mongoose.model("experience", experienceSchema)
module.exports = experience