const express = require('express');
const ElementosMemoriaService = require('../servicios/elementosMemoriaService');

function elementosMemoriaAPI(app) {
    const router = express.Router();
    app.use('/api/elementos-memoria', router);

    const elementosMemoriaService = new ElementosMemoriaService();

    router.get('/', async function (req, res, next) {
        try {
            const elementos = await elementosMemoriaService.getElementos();
            res.status(200).json({
                data: elementos,
                message: 'elementos recuperados con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo un error ${err} al obtener los elementos` });
        }
    });

    router.post('/', async function (req, res, next) {
        try {
            const nuevoElemento = req.body;
            const elementoAnadido = await elementosMemoriaService.addElemento(nuevoElemento);
            res.status(200).json({
                data: elementoAnadido,
                message: 'elemento añadido con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo el error ${err} al añadir el elemento` });
        }
    });

    router.delete('/:idElemento', async function (req, res, next) {
        try {
            let idElemento = req.params.idElemento;
            const resultado = await elementosMemoriaService.delElemento(idElemento);
            res.status(200).json({
                data: resultado,
                message: resultado
            });
        } catch (err) {
            console.log(`se produjo un error ${err} al borrar el elemento`);
            res.status(500).json({ error: `se produjo un error ${err} al borrar el elemento` });
        }
    });
}

module.exports = elementosMemoriaAPI;
