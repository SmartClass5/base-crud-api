const express = require("express");

const router = express.Router();
const UserController  = require('../controller/user-permission');
router.get('/', UserController.getUser);

// GET /User/:id
router.get('/:id', UserController.getUser);

// POST /tweeets
router.post('/', UserController.createUser);

// PUT /User/:id
router.put('/:id', UserController.updateUser);

// DELETE /User/:id
router.delete('/:id', UserController.deleteUser);

module.exports = router;