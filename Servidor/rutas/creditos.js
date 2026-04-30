const express = require('express');
const CreditosService = require('../servicios/creditosService');

function creditosAPI(app) {
    const router = express.Router();
    app.use('/api/creditos', router);

    const creditosService = new CreditosService();

    router.get('/', async function (req, res, next) {
        try {
            const creditos = await creditosService.getCreditos();
            res.status(200).json({
                data: creditos,
                message: 'créditos recuperados con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo un error ${err} al obtener los créditos` });
        }
    });

    router.post('/', async function (req, res, next) {
        try {
            const nuevoCredito = req.body;
            const creditoAnadido = await creditosService.addCredito(nuevoCredito);
            res.status(200).json({
                data: creditoAnadido,
                message: 'crédito añadido con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo el error ${err} al añadir el crédito` });
        }
    });

    router.delete('/:idCredito', async function (req, res, next) {
        try {
            let idCredito = req.params.idCredito;
            const resultado = await creditosService.delCredito(idCredito);
            res.status(200).json({
                data: resultado,
                message: resultado
            });
        } catch (err) {
            console.log(`se produjo un error ${err} al borrar el crédito`);
            res.status(500).json({ error: `se produjo un error ${err} al borrar el crédito` });
        }
    });
}

module.exports = creditosAPI;
