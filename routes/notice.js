const express = require("express");

const router = express.Router();
const NoticeController  = require('../controller/notice');
router.get('/', NoticeController.getNotice);

// GET /Notice/:id
router.get('/:id', NoticeController.getNotice);

// POST /tweeets
router.post('/', NoticeController.createNotice);

// PUT /Notice/:id
router.put('/:id', NoticeController.updateNotice);

// DELETE /Notice/:id
router.delete('/:id', NoticeController.deleteNotice);

module.exports = router;