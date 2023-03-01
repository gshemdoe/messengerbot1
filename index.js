const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const getRoutes = require('./routes/getRoutes')
const postRoutes = require('./routes/postRoutes')

//connect to db
mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASS}@nodetuts-shard-00-00.ngo9k.mongodb.net:27017,nodetuts-shard-00-01.ngo9k.mongodb.net:27017,nodetuts-shard-00-02.ngo9k.mongodb.net:27017/mkeka-wa-leo?authSource=admin&replicaSet=atlas-pyxyme-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`)
.then(()=> console.log('Connected to Mkeka Database'))
.catch((err)=> {
    console.log(err)
})

//middlewares
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(getRoutes)
app.use(postRoutes)

app.listen(process.env.PORT || 3000, ()=> console.log("Running on port 3000"))

//tutorial - 