const MongoLib = require('../lib/mongo');

class CreditosService {
    constructor() {
        this.coleccion = 'Creditos';
        this.mongoDB = new MongoLib();
    }

    async getCreditos() {
        try {
            const creditos = await this.mongoDB.getDocumentos(this.coleccion);
            return creditos;
        } catch (error) {
            console.log('error recuperando créditos', error);
            throw error;
        }
    }

    async addCredito(credito) {
        try {
            const resultado = await this.mongoDB.addDocumento(this.coleccion, credito);
            return resultado;
        } catch (error) {
            console.log('error añadiendo crédito', error);
            throw error;
        }
    }

    async delCredito(idCredito) {
        try {
            const resultado = await this.mongoDB.delDocumento(this.coleccion, idCredito);
            return resultado;
        } catch (error) {
            console.log(`error ${error} en el servicio de borrado de crédito`);
            throw error;
        }
    }
}

module.exports = CreditosService;
