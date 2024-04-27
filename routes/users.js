var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/users')

// Create a new user
router.post('/', user_controller.createUser);

router.get('/', user_controller.getAllUsers)

// Get user by ID
router.get('/:id', user_controller.getUserById);

// Update user by ID
router.patch('/:id', user_controller.updateUser);

// Delete user by ID
router.delete('/:id', user_controller.deleteUser);


module.exports = router;
