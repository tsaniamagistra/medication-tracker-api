const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.post('/', userController.createUser);

router.get('/:email', userController.getUserByEmail);

router.put('/:id', userController.updateUserById);

router.delete('/:id', userController.deleteUserById);

module.exports = router;
