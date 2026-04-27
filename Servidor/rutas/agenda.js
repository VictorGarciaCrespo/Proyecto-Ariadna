const express = require('express');
const AgendaService = require('../servicios/agendaService');

function agendaAPI(app) {
    const router = express.Router();
    app.use('/api/agenda', router);

    const agendaService = new AgendaService();

    router.get('/', async function (req, res, next) {
        try {
            const items = await agendaService.getAgendaItems();
            res.status(200).json({
                data: items,
                message: 'items de agenda recuperados con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo un error ${err} al obtener la agenda` });
        }
    });

    router.post('/', async function (req, res, next) {
        try {
            const nuevoItem = req.body;
            const itemAnadido = await agendaService.addAgendaItem(nuevoItem);
            res.status(200).json({
                data: itemAnadido,
                message: 'item de agenda añadido con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo el error ${err} al añadir el item de agenda` });
        }
    });

    router.delete('/:idItem', async function (req, res, next) {
        try {
            let idItem = req.params.idItem;
            const resultado = await agendaService.delAgendaItem(idItem);
            res.status(200).json({
                data: resultado,
                message: resultado
            });
        } catch (err) {
            console.log(`se produjo un error ${err} al borrar el item de agenda`);
            res.status(500).json({ error: `se produjo un error ${err} al borrar el item de agenda` });
        }
    });

    router.put('/:idItem', async function (req, res, next) {
        try {
            const idItem = req.params.idItem;
            const itemData = req.body;
            const resultado = await agendaService.updateAgendaItem(idItem, itemData);
            res.status(200).json({
                data: resultado,
                message: 'item de agenda actualizado con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err} al actualizar el item de agenda`);
            res.status(500).json({ error: `se produjo un error ${err} al actualizar el item de agenda` });
        }
    });
}

module.exports = agendaAPI;
