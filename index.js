var express = require('express')
var app = express()
const port = 5000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {User} = require('./models/User');

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true}));  // application/x-www-form-urlencoded
app.use(bodyParser.json());  // application/json

mongoose.connect(config.mongoURI, {
    userNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world!!!')
})

app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({success:false, err})
        return res.status(200).json({
            success: true
        })
    });
})

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))