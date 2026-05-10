const MongoLib = require('../lib/mongo');

class IntrusosService {
    constructor() {
        this.coleccion = 'Intrusos';
        this.mongoDB = new MongoLib();
    }

    async getIntrusos() {
        try {
            const intrusos = await this.mongoDB.getDocumentos(this.coleccion);
            // Ordenar por número de ronda
            intrusos.sort((a, b) => a.ronda - b.ronda);
            return intrusos;
        } catch (error) {
            console.log('error recuperando intrusos', error);
            throw error;
        }
    }

    async addIntruso(intruso) {
        try {
            const resultado = await this.mongoDB.addDocumento(this.coleccion, intruso);
            return resultado;
        } catch (error) {
            console.log('error añadiendo intruso', error);
            throw error;
        }
    }

    async delIntruso(idIntruso) {
        try {
            const resultado = await this.mongoDB.delDocumento(this.coleccion, idIntruso);
            return resultado;
        } catch (error) {
            console.log(`error ${error} en el servicio de borrado de intrusos`);
            throw error;
        }
    }
}

module.exports = IntrusosService;
