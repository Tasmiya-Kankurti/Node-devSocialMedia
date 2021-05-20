const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoURL = require('./config/').mongoURL

const user = require('./src/routes/userRoute')
const auth = require('./src/routes/authRoute')
const profile = require('./src/routes/profileRoute')
const experience = require('./src/routes/experienceRoute')
const education = require('./src/routes/educationRoute')
const post = require('./src/routes/postRoute')
const discussion = require('./src/routes/discussionRoute')
const likes = require('./src/routes/likeRoute')
const dislikes = require('./src/routes/dislikeRoute')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useFindAndModify: false, 
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database Successfully connected :)")
}).catch((error)=>{
    console.log(`ERROR: ${error.message}`);
})

const PORT =  process.env.PORT || 1234

app.get('/', (req, res) => {
    res.send("test")
})

app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/profile', profile)
app.use('/api/experience', experience)
app.use('/api/education', education)
app.use('/api/post', post)
app.use('/api/discussion', discussion)
app.use('/api/likes', likes)
app.use('/api/dislikes', dislikes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})