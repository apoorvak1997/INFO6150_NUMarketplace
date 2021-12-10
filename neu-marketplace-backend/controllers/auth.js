const User = require('../models/user');
const jwt = require("jsonwebtoken"); //to generate signed token
const expressJwt = require("express-jwt"); //for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");
//let uuidv1 = require('uuidv1');

exports.signup = (req, res) => {
    //console.log('req.body', req.body);
    //console.log(uuidv1())
    const user = new User(req.body);
    user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

exports.signin = (req, res) => {
    //find the user based on email
    const { email, password} = req.body
    User.findOne({ email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email or nuid does not exist'
            });
        }
        //if user is found make sure the email and password  match
        //create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }
        //generate a signed token  with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        res.cookie('t', token, { expire: new Date() + 9999 });
        const { _id, name, email, role } = user

        return res.json({ token, user: { _id, email, name, role } });
    });
};
exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout successful' });
}

//it requires cookie parser to work
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});


exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id

    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        })
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Access denied. Admin resource"
        });
    }
    next();
};