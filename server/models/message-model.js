var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema ({
    sender: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    text: { type: String, required: true },
    imgs: [{ type: Schema.Types.ObjectId, required: false, ref: 'Image' }],
    sendTime: { type: Date, required: true, default: Date.now },
    readTime: { type: Date, required: false, default: null },
    deleted: { type: Boolean, required: true, default: false },
});

var MessageThreadSchema = new Schema({
    subscribers: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
    msgs: [MessageSchema]
});


module.exports.Message = mongoose.model('Message', MessageSchema);
module.exports.MessageThread = mongoose.model('MessageThread', MessageThreadSchema);
