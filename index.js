const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoURL = require('./config/').mongoURL

const user = require('./src/routes/userRoute')
const auth = require('./src/routes/authRoute')
const profile = require('./src/routes/profileRoute')
const experience = require('./src/routes/experienceRoute')
const education = require('./src/routes/educationRoute')

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

app.use('/user', user)
app.use('/auth', auth)
app.use('/profile', profile)
app.use('/experience', experience)
app.use('/education', education)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})