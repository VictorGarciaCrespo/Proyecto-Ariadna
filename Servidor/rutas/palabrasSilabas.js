const express = require('express');
const PalabrasSilabasService = require('../servicios/palabrasSilabasService');

function palabrasSilabasAPI(app) {
    const router = express.Router();
    app.use('/api/palabras-silabas', router);

    const palabrasSilabasService = new PalabrasSilabasService();

    router.get('/', async function (req, res, next) {
        try {
            const palabras = await palabrasSilabasService.getPalabras();
            res.status(200).json({
                data: palabras,
                message: 'palabras de sílabas recuperadas con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo un error ${err} al obtener las palabras` });
        }
    });

    router.post('/', async function (req, res, next) {
        try {
            const nuevaPalabra = req.body;
            const palabraAnadida = await palabrasSilabasService.addPalabra(nuevaPalabra);
            res.status(200).json({
                data: palabraAnadida,
                message: 'palabra de sílaba añadida con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo el error ${err} al añadir la palabra` });
        }
    });

    router.delete('/:idPalabra', async function (req, res, next) {
        try {
            let idPalabra = req.params.idPalabra;
            const resultado = await palabrasSilabasService.delPalabra(idPalabra);
            res.status(200).json({
                data: resultado,
                message: resultado
            });
        } catch (err) {
            console.log(`se produjo un error ${err} al borrar la palabra`);
            res.status(500).json({ error: `se produjo un error ${err} al borrar la palabra` });
        }
    });
}

module.exports = palabrasSilabasAPI;
