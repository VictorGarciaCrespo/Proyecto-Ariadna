// Importar módulos
const express = require('express')
const app = express()
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Configuración de CORS para permitir peticiones desde Angular
var corsOptions = { 
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// ESTOS DOS SON MUY IMPORTANTES para poder leer el body de las peticiones POST/PUT
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'))

const perfilesAPI = require('./rutas/perfiles')
const elementosMemoriaAPI = require('./rutas/elementosMemoria')
const palabrasVocalesAPI = require('./rutas/palabrasVocales')

// Inicializar rutas
perfilesAPI(app)
elementosMemoriaAPI(app)
palabrasVocalesAPI(app)

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor de node corriendo en http://localhost:${PORT}`);
});
