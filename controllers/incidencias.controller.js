const { json } = require("express");
const incidencias = require("../data/incidencias.js");

const crearIncidencia = (req, rest) => {
    try {
        const { empleado, area, descripcion, prioridad } = req.body;
        //Validacion de campos obligatorios
        if (!empleado || !area || !descripcion || !prioridad) {
            rest.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
            return;
        }
        //Prioridades validas
        let prioridadValida = [
            "Alta",
            "Media",
            "Baja"
        ];
        //Validar prioridad valida
        if (!prioridadValida.includes(prioridad)) {
            return rest.status(400).json({ mensaje: 'La prioridad debe ser Alta, Media o Baja' });
        }
        //Validacion de campos vacios
        if (empleado.trim().length === 0 || area.trim().length === 0 || descripcion.trim().length === 0 || prioridad.trim().length === 0) {
            return rest.status(400).json({ mensaje: 'Los campos no pueden estar vacíos' });
        }
      
        let nuevoId = Number(incidencias.at(-1).id + 1);

        const nuevaIncidencia = {
            id: nuevoId,
            empleado,
            area,
            descripcion,
            prioridad,
            estado: "Pendiente"
        };
        incidencias.push(nuevaIncidencia);
        rest.status(201).json({
            mensaje: 'Incidencia registrada correctamente',
            incidencia: nuevaIncidencia
        });

    } catch (error) {
        rest.status(500).json({ mensaje: 'Error al crear la incidencia' });
    }

}

const listarIncidencias = (req, rest) => {
    //Validacion sobre ninguna incidencia registrada
    if (incidencias.length === 0) {
        rest.status(404).json({ mensaje: 'No hay incidencias registradas' });
        return;
    }
    rest.status(200).json(incidencias);
}

const eliminarIncidencia = (req, res) => {
  //busca el elemento en el array y duelve el indice del elemento encontrado, si no lo encuentra devuelve -1
  const indice = incidencias.findIndex((i) => i.id === Number(req.params.id));

  if (indice === -1) {
    return res.status(404).json({ message: "No se encontro la incidencia" });
  }
  // devuelve una copia superficial de una parte de un arreglo o una cadena de texto en un nuevo objeto, sin modificar el original
  const [incidenciaEliminada] = incidencias.splice(indice, 1);

  return res.json({
    message: "Incidencia eliminada correctamente",
    incidencia: incidenciaEliminada,
  });
};

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

const estadisticasIncidencias = (req, res) => {
  const totalIncidencias = incidencias.length;
  const incidenciasPendientes = incidencias.filter(i => i.estado === "Pendiente").length;
  const incidenciasenProceso = incidencias.filter(i => i.estado === "En proceso").length
  const incidenciasResueltas = incidencias.filter(i => i.estado === "Resuelta").length; 
  const incidenciasCanceladas = incidencias.filter(i => i.estado === "Cancelada").length;

  return res.json({
    totalIncidencias: totalIncidencias,
    pendientes: incidenciasPendientes,
    enProceso: incidenciasenProceso,
    resueltas: incidenciasResueltas,
    canceladas: incidenciasCanceladas
  })
};

module.exports = {
  crearIncidencia,
  listarIncidencias,
  eliminarIncidencia,
  obtenerIncidencia,
  clasificarIncidencia,
  estadisticasIncidencias
};

