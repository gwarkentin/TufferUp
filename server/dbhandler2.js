const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const passwords = require('./.password.js')
const uri = "mongodb+srv://tuffy:" + passwords.mongo + "@tufferup.5qlje.mongodb.net/tufferup?retryWrites=true&w=majority";

const userSchema = new Schema({
    username: String,
    email: String,
    hash: String,
});

userSchema.methods.createUser = function (username, email, password) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
        this.username = username;
        this.email = email;
        this.hash = hash;
    });
} 
const User = mongoose.model('User', userSchema);

async function createUser(user, email, password) {
    try {
        await mongoose.connect(uri);
        const newuser = new User();

    }
    catch {

    }
}
async function checkUser(username, password) {
    //... fetch user from a db etc.

    const match = await bcrypt.compare(password, user.passwordHash);

    if(match) {
        //login
    }
    //...
}








const { MongoClient, ServerApiVersion } = require('mongodb');

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
