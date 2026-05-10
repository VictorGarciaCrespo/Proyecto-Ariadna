const express = require('express');
const AccionesObjetosService = require('../servicios/accionesObjetosService');

function accionesObjetosAPI(app) {
    const router = express.Router();
    app.use('/api/acciones-objetos', router);

    const accionesObjetosService = new AccionesObjetosService();

    router.get('/', async function (req, res, next) {
        try {
            const parejas = await accionesObjetosService.getAccionesObjetos();
            res.status(200).json({
                data: parejas,
                message: 'parejas accion-objeto recuperadas con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo un error ${err} al obtener las parejas accion-objeto` });
        }
    });
}

module.exports = accionesObjetosAPI;
