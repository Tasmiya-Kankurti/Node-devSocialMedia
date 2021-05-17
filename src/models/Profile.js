const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    career: {
        type: String,
        required: true
    },

    work: {
        type: String,
        required: true 
    },

    companyWebsite: {
        type: String,
        required: false 
    },

    citystate: {
        type: String,
        required: false 
    },

    skills: {
        type: String,
        required: true 
    },

    gitName: {
        type: String,
        required: false
    },

    about: {
        type: String,
        required: false 
    },

    twitter: {
        type: String,
        required: false
    },

    facebook: {
        type: String,
        required: false
    },

    youtube: {
        type: String,
        required: false 
    },

    linkedIn: {
        type: String,
        required: false
    },

    instagram: {
        type: String,
        required: false
    }
}) 

const profile = mongoose.model("profile", profileSchema)
module.exports = profile