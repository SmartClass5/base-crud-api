const express = require("express");

const router = express.Router();
const DockerImageController  = require('../controller/docker-image');
router.get('/', DockerImageController.getDockerImage);

// GET /DockerImage/:id
router.get('/:id', DockerImageController.getDockerImage);

// POST /tweeets
router.post('/', DockerImageController.createDockerImage);

// PUT /DockerImage/:id
router.put('/:id', DockerImageController.updateDockerImage);

// DELETE /DockerImage/:id
router.delete('/:id', DockerImageController.deleteDockerImage);

module.exports = router;