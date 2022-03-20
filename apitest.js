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
        'api-key': 'RvvMpu9nJKPB2AkRLjpdSTQDrdi92y0AnK5TH1XzgY1hkw7he77QnOqpJDNXyzSw'
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
