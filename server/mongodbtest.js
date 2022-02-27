const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');

async function makeClient() {
    const data = fs.readFileSync('.password', 'utf8');
    var uri = "mongodb+srv://tuffy:" + data + "@tufferup.5qlje.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    return client
}
       
async function run(client) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        dbName = "tufferup" 
        const db = client.db(dbName);
        // Use the collection "people"
        const col = db.collection("people");
        // Construct a document                                                                                                                                                              
        let personDocument = {
        "name": { "first": "Alan", "last": "Turing" },
        "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
        "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
        "contribs": [ "Turing machine", "Turing test", "Turingery" ],
        "views": 1250000
        }
        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(personDocument);
        console.log("p: ", p)
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);
        } catch (err) {
         console.log(err.stack);
     }
     finally {
        await client.close();
    }
}
makeClient().then((client)=>run(client))