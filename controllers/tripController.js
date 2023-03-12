const Trip = require('./../models/tripModel');
const ApiFeatures = require('./../utilis/apiFeatures');
const errorCatcher = require('./../utilis/errorCatcher');
const AppError = require('./../utilis/appError');

exports.getAllTrips = errorCatcher(async (req, res, next) => {

    console.log(`Expirtation: ${process.env.JWT_EXPIRES_IN}`)

    // --Form Query-- //
    const apiFeatures = new ApiFeatures(Trip.find(), req.query).filter();

    //--Excute the query--//
    const tours = await apiFeatures.query;

    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    })

});

exports.addTrip = errorCatcher(async (req, res, next) => {

    const newTrip = await Trip.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            trip: newTrip
        }
    });

});

exports.getTrip = errorCatcher(async (req, res, next) => {

    const tour = await Trip.findById(req.params.id);

    if (!tour) {
        return next(new AppError('Invalid ID. No trip has that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });

});

exports.deleteTrip = errorCatcher(async (req, res, next) => {

    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
        return next(new AppError('Invalid ID. No trip has that id', 404));
    }

    res.status(204).json({
        status: 'success',
        data: 'null'
    });

});

exports.updateTrip = errorCatcher(async (req, res, next) => {

    console.log('This is the request', req);

    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
        returnDocument: 'after',
        runValidators: true
    });

    if (!updatedTrip || !req.body) {
        return next(new AppError('Invalid ID. No trip has that id', 404));
    }

    console.log(updatedTrip);

    res.status(200).json({
        status: 'success',
        data: {
            tour: updatedTrip
        }
    });

});

exports.getTripStats = errorCatcher(async (req, res, next) => {

    const stats = await Trip.aggregate([{
        $match: {
            numOfChildren: {
                $gte: 1
            }
        },

    }, {
        $group: {
            _id: null,
            numTrips: {
                $count: 1
            }
        }
    }]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});