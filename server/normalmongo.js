const { MongoClient, ServerApiVersion } = require('mongodb');
const passwords = require('./.password.js')
const uri = "mongodb+srv://tuffy:" + passwords.mongo + "@tufferup.5qlje.mongodb.net/tufferup?retryWrites=true&w=majority";

async function makeClient() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    return client
}

async function addUser(client) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection("test");
        // Construct a document                                                                                                                                                              
        let testDocument = {
            "email": "email@email.com",
            "username": "gabe",
            "password": "hashedpass"
        }

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(testDocument);
        const myDoc = await col.findOne();
        console.log(myDoc);
        } catch (err) {
         console.log(err.stack);
     }
     finally {
        await client.close();
    }
}
//makeClient().then((client)=>addUser(client))