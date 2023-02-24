const express = require('express')
const app = express()
require('dotenv').config()

const getRoutes = require('./routes/getRoutes')
const postRoutes = require('./routes/postRoutes')

//middlewares
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(getRoutes)
app.use(postRoutes)

app.listen(process.env.PORT || 3000, ()=> console.log("Running on port 3000"))