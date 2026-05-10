const MongoLib = require('../lib/mongo');

class AccionesObjetosService {
    constructor() {
        this.coleccion = 'Acciones_objetos';
        this.mongoDB = new MongoLib();
    }

    async getAccionesObjetos() {
        try {
            const parejas = await this.mongoDB.getDocumentos(this.coleccion);
            return parejas;
        } catch (error) {
            console.log('error recuperando acciones-objetos', error);
            throw error;
        }
    }
}

module.exports = AccionesObjetosService;
