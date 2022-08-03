const express = require("express");

const router = express.Router();
const LectureController  = require('../controller/lecture');
router.get('/', LectureController.getLecture);

// GET /Lecture/:id
router.get('/:id', LectureController.getLecture);

// POST /tweeets
router.post('/', LectureController.createLecture);

// PUT /Lecture/:id
router.put('/:id', LectureController.updateLecture);

// DELETE /Lecture/:id
router.delete('/:id', LectureController.deleteLecture);

module.exports = router;