var validator = require("email-validator");

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    creationDate: { type: Date, required: true, default: Date.now },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    thumbnail: { type: Schema.Types.ObjectId, ref:'Image' },
    posts: [ {type: Schema.Types.ObjectId, ref:'Post'}],
    rating: { type: Number, min: 1, max: 5},
    msg_threads: [{
     thread: { type: Schema.Types.ObjectId, ref:'MessageThread'},
     unread: { type: Boolean, required: true, default: true}
    }]

});

UserSchema.pre("save", function(next) {
    var user = this;
    let regex = /^.*@csu.fullerton.edu+$/;
    if (validator.validate(user.email)) {
        if (regex.test(user.email)) {
            return next();
        } 
    } 
    var err = 'error: Email has to be CSUF-issued and contain alphanumerical characters.';
    return next(err);  
}); 

UserSchema.pre("save", function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(enteredPassword, cb) {
    var user = this;
    bcrypt.compare(enteredPassword, user.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
