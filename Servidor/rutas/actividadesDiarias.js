const express = require('express');
const ActividadesDiariasService = require('../servicios/actividadesDiariasService');

function actividadesDiariasAPI(app) {
    const router = express.Router();
    app.use('/api/actividades-diarias', router);

    const actividadesDiariasService = new ActividadesDiariasService();

    router.get('/', async function (req, res, next) {
        try {
            const actividades = await actividadesDiariasService.getActividades();
            res.status(200).json({
                data: actividades,
                message: 'actividades diarias recuperadas con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo un error ${err} al obtener las actividades diarias` });
        }
    });

    router.post('/', async function (req, res, next) {
        try {
            const nuevaActividad = req.body;
            const actividadAnadida = await actividadesDiariasService.addActividad(nuevaActividad);
            res.status(200).json({
                data: actividadAnadida,
                message: 'actividad diaria añadida con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo el error ${err} al añadir la actividad diaria` });
        }
    });

    router.delete('/:idActividad', async function (req, res, next) {
        try {
            let idActividad = req.params.idActividad;
            const resultado = await actividadesDiariasService.delActividad(idActividad);
            res.status(200).json({
                data: resultado,
                message: resultado
            });
        } catch (err) {
            console.log(`se produjo un error ${err} al borrar la actividad diaria`);
            res.status(500).json({ error: `se produjo un error ${err} al borrar la actividad diaria` });
        }
    });
}

module.exports = actividadesDiariasAPI;
