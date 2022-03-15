
var axios = require('axios');

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
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-pkysg/endpoint/data/beta/action/insertOne', //only change url
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'h1FiSo3BRajY7wjyUkvup7imsnX5u9BDQ91WFz5NCs5K3qCkGU5TeQy3FHzm3VUr'
        },
        data : personDocument
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
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-pkysg/endpoint/data/beta/action/findOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'h1FiSo3BRajY7wjyUkvup7imsnX5u9BDQ91WFz5NCs5K3qCkGU5TeQy3FHzm3VUr'
        },
        data : data
    };

    console.log('requesting mongo for id: ' + postID)
    try {
        const response = await axios(config)
        const rd = response.data;
        console.log('mongodb rd: ' + JSON.stringify(rd))
        return(rd.document)
    }
    catch {
        console.log(error);
        return( 'Error')
    }
};
