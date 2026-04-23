// Importar módulos
const express = require('express')
const app = express()
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))


const perfilesAPI = require('./rutas/perfiles')
const elementosMemoriaAPI = require('./rutas/elementosMemoria')
const palabrasVocalesAPI = require('./rutas/palabrasVocales')
// Inicializar rutas
perfilesAPI(app)
elementosMemoriaAPI(app)
palabrasVocalesAPI(app)

