const Trip = require('./../models/tripModel');
const User = require('./../models/userModel');
const ApiFeatures = require('./../utilis/apiFeatures');
const errorCatcher = require('./../utilis/errorCatcher');
const AppError = require('./../utilis/appError');

exports.login = errorCatcher(async (req, res, next) => {
    res.status(200).render('loginForm', {
        title: "Welcome"
    });
});