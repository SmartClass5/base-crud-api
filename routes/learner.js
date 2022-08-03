const express = require("express");

const router = express.Router();
const LearnerController  = require('../controller/learner');
router.get('/', LearnerController.getLearner);

// GET /Learner/:id
router.get('/:id', LearnerController.getLearner);

// POST /tweeets
router.post('/', LearnerController.createLearner);

// PUT /Learner/:id
router.put('/:id', LearnerController.updateLearner);

// DELETE /Learner/:id
router.delete('/:id', LearnerController.deleteLearner);

module.exports = router;