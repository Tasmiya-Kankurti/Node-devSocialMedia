const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },

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
    },
    experience: [
        {
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
                required: false 
            },
        
            jobDescription: {
                type: String,
                required: false
            },
            
        }
    ],

    education: [
        {

            school: {
                type: String,
                required: true
            },

            degree: {
                type: String,
                required: true
            },

            years: {
                type: String,
                required: true
            }
        }
    ]
    
}) 

const profile = mongoose.model("profile", profileSchema)
module.exports = profile