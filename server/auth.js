var mongoose = require("mongoose");
var User = require('./models/user-model.js');
const passwords = require('./.password.js')

const uri = "mongodb+srv://tuffy:" + passwords.mongo + "@tufferup.5qlje.mongodb.net/tufferup?retryWrites=true&w=majority";

const createUser = async function (userinfo) {
    mongoose.connect(uri, function(err) {
        if (err) throw err;
    });

    var userid = await User.findOne({ email: userinfo.email });
    if (userid) return { error: 'user_exists'};

    var user = new User(userinfo);
    var userid = await user.save();
    return userid;
};

module.exports.createUser = createUser;

var userinfo = {
    email: "gabrielwarkentin@csu.fullerton.edu",
    password: "pass123"
}

async function foo() {
    var res = await createUser(userinfo);
    console.log(res)
}
