const express = require('express');
const PerfilesService = require('../servicios/perfilesService');

function perfilesAPI(app) {
    const router = express.Router();
    app.use('/api/perfiles', router);

    const perfilesService = new PerfilesService();

    router.get('/', async function (req, res, next) {
        try {
            const perfiles = await perfilesService.getPerfiles();
            res.status(200).json({
                data: perfiles,
                message: 'perfiles recuperados con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo un error ${err} al obtener los perfiles` });
        }
    });

    router.post('/', async function (req, res, next) {
        try {
            const nuevoPerfil = req.body;
            const perfilAnadido = await perfilesService.addPerfil(nuevoPerfil);
            res.status(200).json({
                data: perfilAnadido,
                message: 'perfil añadido con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
            res.status(500).json({ error: `se produjo el error ${err} al añadir el perfil` });
        }
    });

    router.delete('/:idPerfil', async function (req, res, next) {
        try {
            let idPerfil = req.params.idPerfil;
            const resultado = await perfilesService.delPerfil(idPerfil);
            res.status(200).json({
                data: resultado,
                message: resultado
            });
        } catch (err) {
            console.log(`se produjo un error ${err} al borrar el perfil`);
            res.status(500).json({ error: `se produjo un error ${err} al borrar el perfil` });
        }
    });
}

module.exports = perfilesAPI;
