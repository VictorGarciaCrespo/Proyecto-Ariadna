const MongoLib = require('../lib/mongo');

class PerfilesService {
    constructor() {
        this.coleccion = 'Perfiles';
        this.mongoDB = new MongoLib();
    }

    async getPerfiles() {
        try {
            const perfiles = await this.mongoDB.getDocumentos(this.coleccion);
            return perfiles;
        } catch (error) {
            console.log('error recuperando perfiles', error);
            throw error;
        }
    }

    async addPerfil(perfil) {
        try {
            const resultado = await this.mongoDB.addDocumento(this.coleccion, perfil);
            return resultado;
        } catch (error) {
            console.log('error añadiendo perfil', error);
            throw error;
        }
    }

    async delPerfil(idPerfil) {
        try {
            const resultado = await this.mongoDB.delDocumento(this.coleccion, idPerfil);
            return resultado;
        } catch (error) {
            console.log(`error ${error} en el servicio de borrado`);
            throw error;
        }
    }

    async updatePerfil(idPerfil, perfilData) {
        try {
            const resultado = await this.mongoDB.updateDocumento(this.coleccion, idPerfil, perfilData);
            return resultado;
        } catch (error) {
            console.log(`error ${error} en el servicio de actualización`);
            throw error;
        }
    }
}

module.exports = PerfilesService;
