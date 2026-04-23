const MongoLib = require('../lib/mongo');

class ElementosMemoriaService {
    constructor() {
        this.coleccion = 'elementos_memoria';
        this.mongoDB = new MongoLib();
    }

    async getElementos() {
        try {
            const elementos = await this.mongoDB.getDocumentos(this.coleccion);
            return elementos;
        } catch (error) {
            console.log('error recuperando elementos de memoria', error);
            throw error;
        }
    }

    async addElemento(elemento) {
        try {
            const resultado = await this.mongoDB.addDocumento(this.coleccion, elemento);
            return resultado;
        } catch (error) {
            console.log('error añadiendo elemento de memoria', error);
            throw error;
        }
    }

    async delElemento(idElemento) {
        try {
            const resultado = await this.mongoDB.delDocumento(this.coleccion, idElemento);
            return resultado;
        } catch (error) {
            console.log(`error ${error} en el servicio de borrado`);
            throw error;
        }
    }
}

module.exports = ElementosMemoriaService;
