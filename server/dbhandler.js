

var axios = require('axios');

var personDocument = JSON.stringify({
    "collection": "people",
    "database": "tufferup",
    "dataSource": "TufferUp",
    "document": {
        "name": { "first": "Mialiani", "last": "Phommasa" },
        "birth": new Date(2000, 7, 2), // June 23, 1912                                                                                                                                 
        "death": new Date(2080, 5, 7),
        "contribs": [ "Just existing", "Watching shows", "Solving world hunger" ],
        "views": 789
    }
});


var insertconfig = {
method: 'post',
url: 'https://data.mongodb-api.com/app/data-pkysg/endpoint/data/beta/action/insertOne',
headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': 'h1FiSo3BRajY7wjyUkvup7imsnX5u9BDQ91WFz5NCs5K3qCkGU5TeQy3FHzm3VUr'
},
data : personDocument
};           

axios(insertconfig)
    .then(function (response) {
        const rd = response.data;
        console.log(rd)
        getLastPost(rd.insertedId)

    })
    .catch(function (error) {
        console.log(error);
    });


function getLastPost(postID) {
    var data = JSON.stringify({
        "collection": "people",
        "database": "tufferup",
        "dataSource": "TufferUp",
        "filter": {
            "id": postID 
        }
    });
    
    var getconfig = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-pkysg/endpoint/data/beta/action/findOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'h1FiSo3BRajY7wjyUkvup7imsnX5u9BDQ91WFz5NCs5K3qCkGU5TeQy3FHzm3VUr'
        },
        data : data
    };

    axios(getconfig)
        .then(function (response) {
            const rd = response.data;
            console.log(rd)
        })
        .catch(function (error) {
            console.log(error);
        });
    }