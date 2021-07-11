var express = require('express')
var app = express()
const port = 5000

const dbConfig = require('./secrets.json')

const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://oereo:${dbConfig.mongoDBPassword}@boilerplate.t4pdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    userNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))