var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema ({
    category: {
        type: String,
        required: true,
        index: true,
        unique: true
    }
});

var conditionSchema = new Schema ({
    condition: {
        type: String,
        required: true,
        index: true,
        unique: true
    }
});

var PostSchema = new Schema({
    title: String,
    description: String,
    category: categorySchema,
    condition: conditionSchema,
    price: Number,
    discountable: Boolean,
    imgs: Object,
    rating: {
        type:Number,
        min: [0, 'Rating must be >= 0'],
        max: [5, 'Rating must be <= 5']
    }
});

module.exports = mongoose.model('Post', PostSchema);