const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config()

// database model
const UserSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    mail: {type: String, required: true, index: {unique: true, dropDups: true}},
    levelOfAccess: {type: Number, default: 1},
}, {
    versionKey: false,
    timestamps: true
});
UserSchema.plugin(mongoosePaginate);

// function to compare hashed password
UserSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// generate token when logged in
UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        mail: this.mail,
        levelOfAccess: this.levelOfAccess,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, process.env.SECRET_KEY);
}

module.exports = mongoose.model('User', UserSchema);
