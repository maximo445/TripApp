const jwt = require('jsonwebtoken');
const {
    promisify
} = require('util');
const User = require('./../models/userModel');
const errorCatcher = require('./../utilis/errorCatcher');
const AppError = require('./../utilis/appError');

const tokenSignIn = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = errorCatcher(async (req, res, next) => {

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    const token = await tokenSignIn(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });

});

exports.login = errorCatcher(async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    // check if password and email exist in request

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 401))
    }

    // get the user by the email
    const user = await User.findOne({
        email
    }).select('+password');

    if (!user) return next(new AppError('Wrong email or password', 401));

    const passwordMatched = await user.correctPassword(password, user.password);

    if (!passwordMatched) {
        return next(new AppError('Wrong email or password', 401));
    }

    const token = tokenSignIn(user._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: user
        }
    });
});

exports.protect = errorCatcher(async (req, res, next) => {

    let token;

    // check if token exist
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in', 401));
    }

    // check that token works (not tampered or expired)
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //check if user still exist
    const currentUser = await User.findById(decoded.id).select('+password');

    console.log(currentUser);

    if (!currentUser) {
        return next(new AppError('User does not exist. Sad :(', 401));
    }

    //check if password changed
    if (currentUser.passwordChangedAfter(decoded.iat)) {
        return next(new AppError('Password changed recently :(', 401));
    }

    req.user = currentUser;

    next();

});