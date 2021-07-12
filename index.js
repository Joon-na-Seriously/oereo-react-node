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

app.post('/login', (req, res) => {
    // search request email in datebase
    User.findOne({emial: req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    })
    // password validation check

    user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
    })
    // if password valid, generate token
})

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))