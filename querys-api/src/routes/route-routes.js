 
const express = require('express');
const controller = require('../controllers/route-controller');
const router = express.Router();
const path = '/route'

/**
 * Ruta: /route/[param]
 * Metodo: GET
 */
router.get(path, controller.searchByName);


module.exports = router;
