const express = require('express');
const router = express.Router();

const {
    crearIncidencia,
    listarIncidencias,
    obtenerIncidencia,
    eliminarIncidencia,
    clasificarIncidencia,
    cambiarEstadoIncidencia,
    estadisticasIncidencias
} = require('../controllers/incidencias.controller.js');

router.post('/crear', crearIncidencia);
router.get('/listar', listarIncidencias);
router.get('/:id/obtenerPorId', obtenerIncidencia);
router.delete('/:id/eliminar', eliminarIncidencia);
router.get('/:id/clasificar', clasificarIncidencia);
router.put('/:id/cambiarEstado/:nuevoEstado', cambiarEstadoIncidencia);
router.get('/estadisticas', estadisticasIncidencias);

module.exports = router;

