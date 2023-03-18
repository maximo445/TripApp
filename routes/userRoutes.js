const express = require('express');

const {
    getAllUsers,
    addUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:resetToken', authController.resetPassword);
router.patch('/updatePassword/', authController.protect, authController.updatePassword);


router.route('/')
    .get(getAllUsers)
    .post(addUser);

router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;