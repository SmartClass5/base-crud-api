const express = require("express");

const router = express.Router();
const ContentController  = require('../controller/content');
router.get('/', ContentController.getContent);

// GET /Content/:id
router.get('/:id', ContentController.getContent);

// POST /Content
router.post('/', ContentController.createContent);

// PUT /Content/:id
router.put('/:id', ContentController.updateContent);

// DELETE /Content/:id
router.delete('/:id', ContentController.deleteContent);

module.exports = router;