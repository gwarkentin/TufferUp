
var axios = require('axios');
var passwords = require('./.password.js')

var headers =  {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': passwords.apikey
}

// should actually verify format is good
module.exports.verifyPost = function (postForm) {
    return true;
}

module.exports.addPost = async function (postForm) {

    var personDocument = JSON.stringify({
        "database": "tufferup",
        "dataSource": "TufferUp",
        "collection": "post",
        "document": postForm
        });

    var insertconfig = {
        "method": 'post',
        "url": 'https://data.mongodb-api.com/app/data-pkysg/endpoint/data/beta/action/insertOne',
        "headers": headers,
        "data": personDocument
    };           

    try {
        const response = await axios(insertconfig)
        const rd = response.data;
        console.log('dbhandler.js (mongodb response): ' +  JSON.stringify(rd))
        return(rd.insertedId)
    }
    catch {
        console.log(error);
    }
};

module.exports.getPost = async function (postID) {

    var data = JSON.stringify({
        "collection": "post",
        "database": "tufferup",
        "dataSource": "TufferUp",
        "filter": {
            "_id": {
                "$oid": postID
            }
        }
    });

    var config = {
        'method': 'post',
        'url': 'https://data.mongodb-api.com/app/data-pkysg/endpoint/data/beta/action/findOne',
        'headers': headers,
        'data': data
    };

    console.log('requesting mongo for id: ' + postID);
    try {
        const response = await axios(config);
        const rd = response.data;
        console.log('mongodb rd: ' + JSON.stringify(rd));
        return(rd.document);
    }
    catch (error) {
        console.log('error');
    }
};
