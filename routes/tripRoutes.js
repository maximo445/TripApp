const express = require('express');

const {
    getAllTrips,
    addTrip,
    getTrip,
    updateTrip,
    deleteTrip,
    getTripStats
} = require('../controllers/tripController');

const router = express.Router();

router.route('/')
    .get(getAllTrips)
    .post(addTrip);

router.route('/:id')
    .get(getTrip)
    .patch(updateTrip)
    .delete(deleteTrip);

router.route('/trip-stats').get(getTripStats);

module.exports = router;