const { json } = require("express");
const incidencias = require("../data/incidencias.js");

const crearIncidencia = (req, res) => {};

const eliminarIncidencia = (req, res) => {};

const obtenerIncidencia = (req, res) => {};

const clasificarIncidencia = (req, res) => {
  const incidencia = incidencias.find(i => i.id === Number(req.params.id));

  if (!incidencia) {
    return res.status(404).json({message: 'No se encontro la incidencia'})
  }

  let clasification;

  switch (incidencia.prioridad) {
    case "Alta":
      clasification = "Crítica";
      break;
    case "Media":
      clasification = "Importante";
      break;
    case "Baja":
      clasification = "Normal";
      break;

    default:
        clasification = "Sin clasificar";
      break;
  }

  return res.json({
    id: incidencia.id,
    clasificacion: clasification
  })
};

module.exports = {
  crearIncidencia,
  eliminarIncidencia,
  obtenerIncidencia,
  clasificarIncidencia
};
