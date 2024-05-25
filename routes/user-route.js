const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const { multer } = require('../utils/storage-upload');

router.post('/', userController.createUser);

router.get('/id/:id', userController.getUserById);

router.get('/email/:email', userController.getUserByEmail);

router.put('/update/:id', multer.single('profilePicture'), userController.updateUserById);

router.delete('/:id', userController.deleteUserById);

module.exports = router;
