const express = require("express");

const router = express.Router();
const QNAController  = require('../controller/qna');
router.get('/', QNAController.getQNA);

// GET /QNA/:id
router.get('/:id', QNAController.getQNA);

// POST /tweeets
router.post('/', QNAController.createQNA);

// PUT /QNA/:id
router.put('/:id', QNAController.updateQNA);

// DELETE /QNA/:id
router.delete('/:id', QNAController.deleteQNA);

module.exports = router;