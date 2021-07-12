const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trin: true,  // remove blank
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){
    const user = this;
    // 비밀번호 암호화
    if (user.isModified('password')) {
        bycrypt.genSalt(SALT_ROUNDS, function (err, salt) {
            if (err) return next(err);
            bycrypt.hash(user.password, salt, function (err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
   
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bycrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err),
        cb(null, isMatch)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}