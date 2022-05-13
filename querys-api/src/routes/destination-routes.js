const express = require('express');
const controller = require('../controllers/destination-controller');
const router = express.Router();
const path = '/destination'

/**
 * Ruta: /destination/[param]
 * Metodo: GET
 */
router.get(path, controller.searchByName);


module.exports = router;
