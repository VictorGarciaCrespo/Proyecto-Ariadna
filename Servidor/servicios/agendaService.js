const MongoLib = require('../lib/mongo');

class AgendaService {
    constructor() {
        this.coleccion = 'Agenda';
        this.mongoDB = new MongoLib();
    }

    async getAgendaItems() {
        try {
            const items = await this.mongoDB.getDocumentos(this.coleccion);
            return items;
        } catch (error) {
            console.log('error recuperando items de agenda', error);
            throw error;
        }
    }

    async addAgendaItem(item) {
        try {
            const resultado = await this.mongoDB.addDocumento(this.coleccion, item);
            return resultado;
        } catch (error) {
            console.log('error añadiendo item a agenda', error);
            throw error;
        }
    }

    async delAgendaItem(idItem) {
        try {
            const resultado = await this.mongoDB.delDocumento(this.coleccion, idItem);
            return resultado;
        } catch (error) {
            console.log(`error ${error} en el servicio de borrado de agenda`);
            throw error;
        }
    }

    async updateAgendaItem(idItem, itemData) {
        try {
            const resultado = await this.mongoDB.updateDocumento(this.coleccion, idItem, itemData);
            return resultado;
        } catch (error) {
            console.log(`error ${error} en el servicio de actualización de agenda`);
            throw error;
        }
    }
}

module.exports = AgendaService;
