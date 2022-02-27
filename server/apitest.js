

var axios = require('axios');
var data = JSON.stringify({
    "collection": "people",
    "database": "tufferup",
    "dataSource": "TufferUp",
    "projection": {
        "_id": 1
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
            
axios(config)
    .then(function (response) {
        const rd = response.data;
    })
    .catch(function (error) {
        console.log(error);
    });
