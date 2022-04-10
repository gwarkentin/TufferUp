var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);