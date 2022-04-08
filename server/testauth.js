var mongoose = require("mongoose");
var User = require('./user-model.js');
const passwords = require('./.password.js')
const uri = "mongodb+srv://tuffy:" + passwords.mongo + "@tufferup.5qlje.mongodb.net/tufferup?retryWrites=true&w=majority";

mongoose.connect(uri, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});
 
// fetch the user and test password verification
User.findOne({ username: 'jmar777' }, function(err, user) {
    if (err) throw err;
     
    if (!user) {
        var testUser = new User({
            email: 'gabrielwarkentin@csu.fullerton.edu',
            displayname: 'Gabe W',
            password: 'Password123'
        });
        testUser.save(function(err) {
            if (err) throw err;
        });
    }

    // test a matching password
    user.comparePassword('Password123', function(err, isMatch) {
        if (err) throw err;
        console.log('Password123:', isMatch); // -&gt; Password123: true
    });
     
    // test a failing password
    user.comparePassword('123Password', function(err, isMatch) {
        if (err) throw err;
        console.log('123Password:', isMatch); // -&gt; 123Password: false
    });
});