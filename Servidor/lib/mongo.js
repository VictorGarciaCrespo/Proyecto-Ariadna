const { MongoClient, ObjectId } = require('mongodb');
// Apuntamos a la base de datos en la nube (Atlas) en lugar de localhost:3000
const MONGO_URI = 'mongodb+srv://Aarongomezve:123Ariadna@cluster0.han3f1i.mongodb.net/?appName=Cluster0';
const DB_NAME = 'Ariadna';
class MongoLib {
    async connect() {
        if (MongoLib.connection != null) {
            return MongoLib.connection.db(DB_NAME);
        } else {
            try {
                MongoLib.connection = await MongoClient.connect(MONGO_URI);
                console.log('Conectado a la BBDD Ariadna');
                return MongoLib.connection.db(DB_NAME);
            } catch (e) {
                console.log('Error en conexión a BBDD', e);
                return e;
            }
        }
    }

    // Al recibir 'collection' por parámetro, este mismo método te sirve para 
    // 'perfiles', 'elementos_memoria' y 'palabras_vocales'
    async getDocumentos(collection) {
        try {
            let db = await this.connect();
            let result = await db.collection(collection).find().toArray();
            return result;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async addDocumento(collection, data) {
        try {
            let db = await this.connect();
            let result = await db.collection(collection).insertOne(data);
            return result;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async delDocumento(collection, id) {
        let mensaje = '';
        try {
            let db = await this.connect();
            // Asegurarse de que el ID se pasa a formato ObjectId que usa Mongo
            let result = await db.collection(collection).deleteOne({ _id: ObjectId.createFromHexString(id) });

            if (result.deletedCount === 1) {
                mensaje = 'Borrado con éxito';
            } else {
                mensaje = 'No encontrado';
            }
            return mensaje;
        } catch (e) {
            console.log(e);
            return e;
        }
    }
}

module.exports = MongoLib;