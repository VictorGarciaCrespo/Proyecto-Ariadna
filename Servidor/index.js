// Importar módulos
const express = require('express')
const app = express()
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static('public'))

const perfilesAPI = require('./rutas/perfiles')
const elementosMemoriaAPI = require('./rutas/elementosMemoria')
const palabrasVocalesAPI = require('./rutas/palabrasVocales')
const agendaAPI = require('./rutas/agenda')
const rutinasAPI = require('./rutas/rutinas')
const actividadesDiariasAPI = require('./rutas/actividadesDiarias')

perfilesAPI(app)
elementosMemoriaAPI(app)
palabrasVocalesAPI(app)
agendaAPI(app)
rutinasAPI(app)
actividadesDiariasAPI(app)
app.listen(PORT, () => {
    console.log(`Servidor de node corriendo en http://localhost:${PORT}`);
});
