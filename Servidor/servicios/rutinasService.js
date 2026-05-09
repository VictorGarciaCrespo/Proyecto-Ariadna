const MongoLib = require('../lib/mongo');

class RutinasService {
    constructor() {
        this.coleccion = 'Rutinas';
        this.mongoDB = new MongoLib();
    }

    async getRutinas() {
        try {
            const rutinas = await this.mongoDB.getDocumentos(this.coleccion);
            return rutinas;
        } catch (error) {
            console.log('error recuperando rutinas', error);
            throw error;
        }
    }

    async getRutinasByPerfil(idPerfil) {
        try {
            const db = await this.mongoDB.connect();
            // Comparar idPerfil como string (por si en BD está como ObjectId o string)
            const rutinas = await db.collection(this.coleccion).find({ idPerfil: String(idPerfil) }).toArray();
            // Normalizar _id a string en cada rutina
            return rutinas.map(r => ({ ...r, _id: r._id ? r._id.toString() : r._id }));
        } catch (error) {
            console.log('error recuperando rutinas por perfil', error);
            throw error;
        }
    }

    async contRutinasByPerfil(idPerfil) {
        try {
            const db = await this.mongoDB.connect();
            const count = await db.collection(this.coleccion).countDocuments({ idPerfil: String(idPerfil) });
            return count;
        } catch (error) {
            console.log('error contando rutinas por perfil', error);
            throw error;
        }
    }

    async addRutina(rutina) {
        try {
            const resultado = await this.mongoDB.addDocumento(this.coleccion, rutina);
            return resultado;
        } catch (error) {
            console.log('error añadiendo rutina', error);
            throw error;
        }
    }

    async delRutina(idRutina) {
        try {
            const resultado = await this.mongoDB.delDocumento(this.coleccion, idRutina);
            return resultado;
        } catch (error) {
            console.log(`error ${error} en el servicio de borrado de rutina`);
            throw error;
        }
    }

    async updateRutina(idRutina, rutinaData) {
        try {
            const resultado = await this.mongoDB.updateDocumento(this.coleccion, idRutina, rutinaData);
            return resultado;
        } catch (error) {
            console.log(`error ${error} en el servicio de actualización de rutina`);
            throw error;
        }
    }
}

module.exports = RutinasService;
