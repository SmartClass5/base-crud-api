const express = require("express");

const router = express.Router();
const TeacherController  = require('../controller/teacher');
router.get('/', TeacherController.getTeacher);

// GET /Teacher/:id
router.get('/:id', TeacherController.getTeacher);

// POST /tweeets
router.post('/', TeacherController.createTeacher);

// PUT /Teacher/:id
router.put('/:id', TeacherController.updateTeacher);

// DELETE /Teacher/:id
router.delete('/:id', TeacherController.deleteTeacher);

module.exports = router;