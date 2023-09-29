const express = require('express');
const router = express.Router();
const catalogueController = require('../controllers/catalogueController');

// utilise le controller pour gérer la requête GET du catalogue complet
router.get("/", catalogueController.getCatalogue);

module.exports = router;