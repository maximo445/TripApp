const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AppError = require('../utilis/appError');

const userSchema = mongoose.Schema({
    // name, photo, email, phone, password, passwordConfirm
    name: {
        type: String,
        require: [true, 'user must have a name'],
        maxLength: 20
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    email: {
        type: String,
        require: [true, 'caseManager must have an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'email format is not valid']
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        require: [true, 'Please provide a password'],
        minlength: 8,
        validate: {
            validator: function () {
                return this.password === this.passwordConfirm;
            },
            message: 'Passwords are not the same'
        },
        select: false
    },
    passwordConfirm: {
        type: String,
        require: [true, 'Please confirm password']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    role: {
        type: String,
        enum: ['case-manager', 'transport-coordinator', 'driver'],
        default: 'case-manager'
    }
});


// before saving the aquired data to the data base
// this midelware allows us to act on it

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 8);
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async function (PasswordToConfirm, password) {
    return await bcrypt.compare(PasswordToConfirm, password);
}

userSchema.methods.passwordChangedAfter = function (initiateTimeStamp) {

    if (this.createdAt) {
        const timeOfPaswordCreation = parseInt(this.createdAt.getTime(), 10);
        if (timeOfPaswordCreation < initiateTimeStamp) {
            return true;
        }
    }

    return false;

}

const User = mongoose.model('User', userSchema);

module.exports = User;