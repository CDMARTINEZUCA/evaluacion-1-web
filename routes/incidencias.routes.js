const express = require('express');
const router = express.Router();

const {
    crearIncidencia,
    obtenerIncidencia,
    eliminarIncidencia,
} = require('../controllers/incidencias.controller.js');

router.post('/', crearIncidencia);
router.get('/:id', obtenerIncidencia);
router.delete('/:id', eliminarIncidencia);

module.exports = router;