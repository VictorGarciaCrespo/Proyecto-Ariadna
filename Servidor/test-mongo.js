const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://Aarongomezve:123Ariadna@cluster0.han3f1i.mongodb.net/?appName=Cluster0';
async function run() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('Ariadna');
    const cols = await db.listCollections().toArray();
    console.log("Colecciones:", cols.map(c => c.name));
    for (let c of cols) {
        const count = await db.collection(c.name).countDocuments();
        console.log(`- ${c.name}: ${count} documentos`);
    }
    await client.close();
}
run();
