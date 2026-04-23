const MongoLib = require('../lib/mongo');

class PalabrasVocalesService {
    constructor() {
        this.coleccion = 'Palabras_vocales';
        this.mongoDB = new MongoLib();
    }

    async getPalabras() {
        try {
            const palabras = await this.mongoDB.getDocumentos(this.coleccion);
            return palabras;
        } catch (error) {
            console.log('error recuperando palabras vocales', error);
            throw error;
        }
    }

    async addPalabra(palabra) {
        try {
            const resultado = await this.mongoDB.addDocumento(this.coleccion, palabra);
            return resultado;
        } catch (error) {
            console.log('error añadiendo palabra vocal', error);
            throw error;
        }
    }

    async delPalabra(idPalabra) {
        try {
            const resultado = await this.mongoDB.delDocumento(this.coleccion, idPalabra);
            return resultado;
        } catch (error) {
            console.log(`error ${error} en el servicio de borrado`);
            throw error;
        }
    }
}

module.exports = PalabrasVocalesService;
