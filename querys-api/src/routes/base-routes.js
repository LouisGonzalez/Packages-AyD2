const express = require('express');
const controller = require('../controllers/base-controller');
const router = express.Router();
const path = '/'

/**
 * Ruta: /
 * Metodo: GET
 */
router.get(path, controller.home);

module.exports = router;