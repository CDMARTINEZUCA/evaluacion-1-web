const express = require('express');
const incidenciasRoutes = require('./routes/incidencias.routes.js');
const app = express();
const port = 3067;

app.use(express.json());
app.use('/api/incidencias', incidenciasRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost: ${port}`)
});