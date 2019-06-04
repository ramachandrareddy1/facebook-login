
const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema

let userSchema = new Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        imageUrl:String
    }

});

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};


userSchema.methods.hashPassword = function (password, next) {
    let user = this;
    bcrypt.hash(password, null, null, function (err, hash) {
        if (err)
            return next(err);

        user.local.password = hash;
    });

};

module.exports = mongoose.model('User', userSchema);