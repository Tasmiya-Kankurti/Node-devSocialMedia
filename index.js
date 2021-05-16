const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoURL = require('./config/').mongoURL

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

const PORT =  process.env.PORT || 7000

app.get('/', (req, res) => {
    res.send("test")
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})