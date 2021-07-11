var express = require('express')
var app = express()
const port = 5000
const dbConfig = require('./secrets.json');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {User} = require('./models/User');

app.use(bodyParser.urlencoded({extended: true}));  // application/x-www-form-urlencoded
app.use(bodyParser.json());  // application/json

mongoose.connect(`mongodb+srv://oereo:${dbConfig.mongoDBPassword}@boilerplate.t4pdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    userNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
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