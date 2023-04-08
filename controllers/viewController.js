const errorCatcher = require('./../utilis/errorCatcher');

exports.login = errorCatcher(async (req, res, next) => {
    res.status(200).render('loginForm', {
        title: "Welcome"
    });
});