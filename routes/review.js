const express = require("express");

const router = express.Router();
const ReviewController  = require('../controller/review');
router.get('/', ReviewController.getReview);

// GET /Review/:id
router.get('/:id', ReviewController.getReview);

// POST /tweeets
router.post('/', ReviewController.createReview);

// PUT /Review/:id
router.put('/:id', ReviewController.updateReview);

// DELETE /Review/:id
router.delete('/:id', ReviewController.deleteReview);

module.exports = router;