const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    children: {
        type: String,
        require: [true, 'children field can not be empty'],
        unique: true
    },
    days: {
        type: [String],
        require: true
    },
    pickUp: {
        type: String,
        require: [true, 'A trip must have a pick up address']
    },
    dropOff: {
        type: String,
        require: [true, 'A trip must have a drop off adress']
    },
    numOfChildren: {
        type: Number,
        default: 1
    }
})


const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;