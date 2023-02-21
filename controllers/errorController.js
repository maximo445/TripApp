const AppError = require("../utilis/appError");

const handleProductionCastError = (error) => {
    const message = `Invalid ${error.path}: ${error.value}`;
    return new AppError(message, 400);
}

const handleDuplicateIdDB = (error) => {
    const message = `The children cannot have the same name`;
    return new AppError(message, 400);
}

const sendDevErr = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendProdErr = (err, res) => {
    //Operational error caused by our code
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });

        // Error caused by the outside world. Don't give the client much information.
    } else {
        // sending error to user
        res.status(500).json({
            status: 'error',
            message: 'Awful error :('
        });
    }
}


module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendDevErr(err, res);
    } else if (process.env.NODE_ENV === 'production') {

        let error = JSON.parse(JSON.stringify(err));

        if (error.name === 'CastError') {
            error = handleProductionCastError(error);
        }

        if (error.code === 11000) {
            error = handleDuplicateIdDB(error);
        }

        sendProdErr(error, res);
    }

}