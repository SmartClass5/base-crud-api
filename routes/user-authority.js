const express = require("express");

const router = express.Router();
const UserAuthorityController  = require('../controller/user-authority');
router.get('/', UserAuthorityController.getUserAuthority);

// GET /UserAuthority/:id
router.get('/:id', UserAuthorityController.getUserAuthority);

// POST /tweeets
router.post('/', UserAuthorityController.createUserAuthority);

// PUT /UserAuthority/:id
router.put('/:id', UserAuthorityController.updateUserAuthority);

// DELETE /UserAuthority/:id
router.delete('/:id', UserAuthorityController.deleteUserAuthority);

module.exports = router;