var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

// var validateEmail = function(email)  {
//   let regex = /^[a-z_A-Z]+[\w]+@csu.fullerton.edu$/;
//   if (regex.test(email)) {
//     return true;
//   } else {
//     console.log("Email has to be a CSUF-issued and contain only alphanumeric characters.");
//   }
// } 

var UserSchema = new Schema({
    creationDate: { type: Date, required: true, default: Date.now },
    email: { type: String, required: true, index: true, unique: true },
    name: { type: String },
    password: { type: String, required: true },
    posts: [ {type: Schema.Types.ObjectId, ref:'Post'}],
    new_messages: [ {type: Schema.Types.ObjectId, ref:'MessageThread'}]
});

UserSchema.pre("save", function(next) {
    var user = this;
    let regex = /^[a-z_A-Z]+[\w]+@csu.fullerton.edu$/;
    if (regex.test(user.email)) {
        return next();
    } else {
        const err = "Email has to be a CSUF-issued and contain only alphanumeric characters.";
        return next(err);
    }
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
