const MongoLib = require('../lib/mongo');

class ActividadesDiariasService {
    constructor() {
        this.coleccion = 'Actividades_Diarias';
        this.mongoDB = new MongoLib();
    }

    async getActividades() {
        try {
            const actividades = await this.mongoDB.getDocumentos(this.coleccion);
            return actividades;
        } catch (error) {
            console.log('error recuperando actividades diarias', error);
            throw error;
        }
    }

    async addActividad(actividad) {
        try {
            const resultado = await this.mongoDB.addDocumento(this.coleccion, actividad);
            return resultado;
        } catch (error) {
            console.log('error añadiendo actividad diaria', error);
            throw error;
        }
    }

    async delActividad(idActividad) {
        try {
            const resultado = await this.mongoDB.delDocumento(this.coleccion, idActividad);
            return resultado;
        } catch (error) {
            console.log(`error ${error} en el servicio de borrado de actividad diaria`);
            throw error;
        }
    }
}

module.exports = ActividadesDiariasService;
