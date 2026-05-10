const express = require('express');
const IntrusosService = require('../servicios/intrusosService');

function intrusosAPI(app) {
    const router = express.Router();
    app.use('/api/intrusos', router);

    const intrusosService = new IntrusosService();

    router.get('/', async function (req, res, next) {
        try {
            const intrusos = await intrusosService.getIntrusos();
            res.status(200).json({
                data: intrusos,
                message: 'Rondas de intrusos recuperadas con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo un error ${err} al obtener los intrusos` });
        }
    });

    router.post('/', async function (req, res, next) {
        try {
            const nuevoIntruso = req.body;
            const intrusoAnadido = await intrusosService.addIntruso(nuevoIntruso);
            res.status(200).json({
                data: intrusoAnadido,
                message: 'Ronda de intrusos añadida con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo el error ${err} al añadir la ronda` });
        }
    });

    router.delete('/:idIntruso', async function (req, res, next) {
        try {
            let idIntruso = req.params.idIntruso;
            const resultado = await intrusosService.delIntruso(idIntruso);
            res.status(200).json({
                data: resultado,
                message: resultado
            });
        } catch (err) {
            console.log(`se produjo un error ${err} al borrar la ronda de intrusos`);
            res.status(500).json({ error: `se produjo un error ${err} al borrar la ronda` });
        }
    });
}

module.exports = intrusosAPI;
