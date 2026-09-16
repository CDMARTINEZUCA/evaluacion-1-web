const express = require('express');
const router = express.Router();

const {
    crearIncidencia,
    listarIncidencias,
    obtenerIncidencia,
    eliminarIncidencia,
} = require('../controllers/incidencias.controller.js');

router.post('/', crearIncidencia);
router.get('/', listarIncidencias);
router.get('/:id', obtenerIncidencia);
router.delete('/:id', eliminarIncidencia);

module.exports = router;