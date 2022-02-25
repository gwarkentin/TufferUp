const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');


try {
  const data = fs.readFileSync('.password', 'utf8');

  const uri = "mongodb+srv://tuffy:" + data + "@tufferup.5qlje.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  })

} catch (err) {
  console.error(err)
}