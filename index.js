const express = require('express');
const bodyParser = require('body-parser');

const AppError = require('./utilis/appError');
const errorController = require('./controllers/errorController');
const tripRouter = require('./routes/tripRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.urlencoded({
    exended: false
}))

app.use(bodyParser.json());

//middle ware functions to mange the routes 

app.use('/api/v1/tours', tripRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Route: ${req.originalUrl} is invalid`
    // })
    // next()

    // const err = Error(`Route: ${req.originalUrl} is invalid`);
    // err.status = 'fail';
    // err.statusCode = '404';
    // next(err);

    next(new AppError(`Route: ${req.originalUrl} is invalid`, 404));
});

app.use(errorController);

module.exports = app;