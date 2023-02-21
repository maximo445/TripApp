// async functions return a promise or an error 
// I returned the function and inside in I catch the error
// and send it to the error stack with the next method

module.exports = fn => {

    return (req, res, next) => {

        // same as catch(err => next(err))
        fn(req, res, next).catch(next);

    };

};