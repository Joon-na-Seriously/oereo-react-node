const { User } = require('../models/User');

let auth = (req, res, next) => {
    // Authentication
    // get token from client cookie
    // find user from token
    // if user is exist, authenticated
    // if user is not exist, not authenticated

    let token = req.cookies.x_auth;
    
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true});

        req.token = token;
        req.user = user;
        next();  // middleware 이후 계속 갈 수 있도록
    });
}


module.exports = {auth};