const express = require('express');
const RutinasService = require('../servicios/rutinasService');

function rutinasAPI(app) {
    const router = express.Router();
    app.use('/api/rutinas', router);

    const rutinasService = new RutinasService();

    router.get('/', async function (req, res, next) {
        try {
            const rutinas = await rutinasService.getRutinas();
            // Optional: filter by user profile ID if provided in query params, or fetch all and filter in frontend
            res.status(200).json({
                data: rutinas,
                message: 'rutinas recuperadas con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo un error ${err} al obtener las rutinas` });
        }
    });

    router.post('/', async function (req, res, next) {
        try {
            const nuevaRutina = req.body;
            const rutinaAnadida = await rutinasService.addRutina(nuevaRutina);
            res.status(200).json({
                data: rutinaAnadida,
                message: 'rutina añadida con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo el error ${err} al añadir la rutina` });
        }
    });

    router.delete('/:idRutina', async function (req, res, next) {
        try {
            let idRutina = req.params.idRutina;
            const resultado = await rutinasService.delRutina(idRutina);
            res.status(200).json({
                data: resultado,
                message: resultado
            });
        } catch (err) {
            console.log(`se produjo un error ${err} al borrar la rutina`);
            res.status(500).json({ error: `se produjo un error ${err} al borrar la rutina` });
        }
    });

    router.put('/:idRutina', async function (req, res, next) {
        try {
            const idRutina = req.params.idRutina;
            const rutinaData = req.body;
            const resultado = await rutinasService.updateRutina(idRutina, rutinaData);
            res.status(200).json({
                data: resultado,
                message: 'rutina actualizada con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err} al actualizar la rutina`);
            res.status(500).json({ error: `se produjo un error ${err} al actualizar la rutina` });
        }
    });
}

module.exports = rutinasAPI;
