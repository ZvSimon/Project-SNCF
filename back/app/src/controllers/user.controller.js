const bcrypt = require('bcrypt');
const User = require('../models/user.model');
require('dotenv').config();

// login
exports.userLogin = (req, res, next) => {
    const {mail, password} = req.body;

    // findOne is provided by mongoose / filter by mail / .then is waiting for data and then data arrived, it does the function
    User.findOne({mail: mail}).select('-__v').then(
        (user) => {
            // check if user found
            if (!user) {
                return res.status(401).json({status: 'Bad mail !'});
            }
            // check password
            if (!user.validatePassword(password)) {
                return res.status(401).json({status: 'Bad password !'});
            }
            // everything is OK / user logged
            return res.status(200).json({user: user, token: user.generateJWT()});
        },
        (err) => {
            // something were wrong
            return res.status(500).json(err);
        })
};

// register
exports.userRegister = async (req, res, next) => {
    // new user
    const user = new User(req.body);

    // check if there is password
    if (!user.password) {
        console.log('[ERROR] User not registered (reason : No Password)');
        return res.status(401).json({status: 'Bad body : Password required !'});
    }

    // hash password
    user.password = await bcrypt.hash(user.password, 10);
    user.levelOfAccess = 1;

    // save is provided by mongoose / async function wait data and do the function
    await user.save(async function (err, result) {
        // check if error
        if (err) {
            console.log('[ERROR] User create failed', err);
            return res.status(400).json(err);
        }
        // everything is OK, user is logged
        if (result) {
            console.log(`[INFO] User registered (_id=${user._id}) (username=${user.username})`);
            return res.status(200).json({user: result, token: user.generateJWT()});
        }
    })
};

// update user
exports.updateUser = async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;

    // check if new password to hash it
    if (req.body.password)
        req.body.password = await bcrypt.hash(req.body.password, 10);
    // check if user has access to update another user
    if (req.user.levelOfAccess < 3) {
        if (req.user.id.toString() !== id.toString()) {
            return res.status(401).json({status: `User update failed : Unauthorized`});
        }
        delete body.levelOfAccess;
    }

    // findOneAndUpdate is provided by mongoDB / filter by _id / select data returned (removing password and __v / then waiting for data to process
    User.findOneAndUpdate({_id: id}, {$set: body}, {new: true, select: ['-password -__v']}).then(
        (result) => {
            // check if error
            if (result === null) {
                console.log(`[ERROR] User update failed : _id=${id} not found`);
                return res.status(400).json({status: `User update failed : _id=${id} not found`});
            }
            // everything is OK
            console.log(`[INFO] User updated (_id=${id}) (email=${result && result.email})`);
            return res.status(200).json({status: 'User updated !', user: result});
        },
        (err) => {
            // something were wrong
            console.log(`[ERROR] User update failed`, err);
            return res.status(400).json({status: 'User update failed!', error: err});
        })
};
