const express = require("express");

const router = express.Router();
const CategoryController  = require('../controller/category.js');
router.get('/', CategoryController.getCategory);

// GET /Category/:id
router.get('/:id', CategoryController.getCategory);

// POST /tweeets
router.post('/', CategoryController.createCategory);

// PUT /Category/:id
router.put('/:id', CategoryController.updateCategory);

// DELETE /Category/:id
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;