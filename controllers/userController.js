const User = require("../models/userModel")
const errorCatcher = require("./../utilis/errorCatcher");

exports.getAllUsers = errorCatcher(async (req, res, next) => {

    const users = await User.find();
    console.log(res);
    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
});

exports.addUser = errorCatcher(async (req, res, next) => {
    res.status(500).json({
        status: 'failure',
        message: 'route not yet implemented'
    });
});

exports.getUser = errorCatcher(async (req, res, next) => {
    res.status(500).json({
        status: 'faliure',
        message: 'route not yet implemented'
    })
});

exports.updateUser = errorCatcher(async (req, res, next) => {
    res.status(500).json({
        status: 'faliure',
        message: 'route not yet implemented'
    })
});

exports.deleteUser = errorCatcher(async (req, res, next) => {
    res.status(500).json({
        status: 'faliure',
        message: 'route not yet implemented'
    })
});