
const { toNumber } = require('@vue/shared');
var axios = require('axios');
var passwords = require('./.password.js')

var headers =  {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': passwords.apikey
}

// should actually verify format is good
module.exports.verifyPost = async function (postForm) {
    postForm.price = toNumber(postForm.price)
    return(postForm)
}

module.exports.addPost = async function (postForm) {

    postForm.price
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
        //console.log(response)
        const rd = response.data;
        // console.log('dbhandler.js (mongodb response): ' +  JSON.stringify(rd))
        return(rd.insertedId)
    }
    catch (error) {
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
        //console.log(response)
        const rd = response.data;
        // console.log('mongodb rd: ' + JSON.stringify(rd));
        if (rd.document) {
            return({'document': rd.document})
        }
        else {
            return({'error': 'From Mongodb: '+ rd.document});
        }
    }
    catch (error) {
        //console.log(error);
        throw(error);
    }
};


module.exports.getManyPosts = async function (obj) {

    var data = {
        "collection": "post",
        "database": "tufferup",
        "dataSource": "TufferUp",
    };
    for (var key in obj) {
        data[key] = obj[key];
    }

    var config = {
        'method': 'post',
        'url': 'https://data.mongodb-api.com/app/data-pkysg/endpoint/data/beta/action/find',
        'headers': headers,
        'data': data
    };

    // console.log('requesting mongo for id: ' + postID);
    try {
        const response = await axios(config);
        //console.log(response)
        const rd = response.data;
        //console.log('mongodb rd: ' + JSON.stringify(rd));
        if (rd.documents) {
            return({'documents': rd.documents, 'error':null})
        }
        else {
            return({'documents': null, 'error': 'From Mongodb: '+ rd});
        }
    }
    catch (error) {
        //console.log(error);
        throw(error);
    }
};