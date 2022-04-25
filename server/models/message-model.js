var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageThreadSchema = new Schema();

var MessageSchema = new Schema ({
    thread: { type: MessageThreadSchema, required: true, default: () => ({})},
    msg: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    sendTime: { type: Date, required: true, default: Date.now },
    readTime: { type: Date, required: false, default: null },
    deleted: { type: Boolean, required: true, default: false },
});

module.exports.Message = mongoose.model('Message', MessageSchema);
