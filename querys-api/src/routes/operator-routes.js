 
const express = require('express');
const controller = require('../controllers/operator-controller');
const router = express.Router();
const path = '/operator'

/**
 * Ruta: /operator/[param]
 * Metodo: GET
 */
router.get(path, controller.searchByCUI);


module.exports = router;
