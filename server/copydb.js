
var logger = require('morgan');
const passwords = require('./.password.js')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tuffy:" + passwords.mongo + "@tufferup.5qlje.mongodb.net/tufferup?retryWrites=true&w=majority";

Date.prototype.yyyymmddhhmmss = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();
  var hh = this.getHours();
  var mi = this.getMinutes();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd,
          (hh>9 ? '' : '0') + hh,
          (mi>9 ? '' : '0') + mi
         ].join('');
};

async function makeBackup() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db("tufferup");
        const colnames = db.collections()
        var newdate = new Date();
        var datestr = newdate.yyyymmddhhmmss();
        for (var oldcolname in colnames) {
          const col = db.collection(oldcolname);
          col.aggregate([{$out: oldcolname + datestr}]);
        }
     }
     catch (err) {
       console.log(err)
     }
}

makeBackup().then(console.log('done')).catch();