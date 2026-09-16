const incidencias = require('../data/incidencias.js')

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

        const nuevaIncidencia = {
            id: incidencias.length + 1,
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

const eliminarIncidencia = (req, rest) => {

}

const obtenerIncidencia = (req, rest) => {

}

module.exports = {
    crearIncidencia,
    listarIncidencias,
    eliminarIncidencia,
    obtenerIncidencia
};