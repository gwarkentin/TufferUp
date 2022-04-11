var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema ({
    category: {
        type: String,
        required: true,
    }
});

var ConditionSchema = new Schema ({
    condition: {
        type: String,
        required: true,
    }
});

var PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    creationDate: { type: Date, required: true, default: Date.now },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category'},
    condition: { type: Schema.Types.ObjectId, required: true, ref: 'Condition'},
    price: { type:Number, required: true, min: [0, 'Must have price >= 0'] },
    discountable: { type: Boolean, default: true },
    imgs: Object, // is it time for gridfs?
});

module.exports.Post = mongoose.model('Post', PostSchema);
module.exports.Condition = mongoose.model('Condition', ConditionSchema);
module.exports.Category = mongoose.model('Category', CategorySchema);