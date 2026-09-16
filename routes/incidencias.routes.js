const express = require('express');
const router = express.Router();

const {
    crearIncidencia,
    obtenerIncidencia,
    eliminarIncidencia,
    clasificarIncidencia
} = require('../controllers/incidencias.controller.js');

router.post('/', crearIncidencia);
router.get('/:id', obtenerIncidencia);
router.delete('/:id', eliminarIncidencia);
router.get('/:id/clasificar', clasificarIncidencia);

module.exports = router;