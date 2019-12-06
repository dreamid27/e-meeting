const mongoose = require('mongoose'), userModel = require('../model/userModel'),bcrypt = require('bcryptjs'),JWTService = require('./JWTService');

mongoose.connect(process.env.DB_API, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind('Connection error:'))
.then(obj => console.log('Connected'))
.catch(obj => console.log('not connected'));

const createUser = async (_username, _password, _email) => {
    let hashPassword = await generateEncryptPassword(_password)
    let objUser = new userModel({username: _username, password: hashPassword, email: _email});
    let resUser = await objUser.save()
    return resUser
}

const loginUser = async (_userID, _password) => {
    let objUser =  await userModel.findOne({$or: [
        {username: _userID},
        {email: _userID}
    ]}); 
    if (objUser && await checkIsPasswordMatch(_password, objUser.password)) {
        console.log(objUser);
        let userJWT = await JWTService.encodeJsonWebToken(objUser)
        return userJWT
    } 
    return false
}

const getUser = async(_token) => {
    return await JWTService.decodeJsonWebToken(_token)
}

const generateEncryptPassword = async (_plainTextPassword) => {
    try {
        return await bcrypt.hash(_plainTextPassword, 10)
    } catch (error) {
        return error;
    }
}

const checkIsPasswordMatch = async (_plainTextPassword, _encryptPasswordHash) => {
    try {
        return await bcrypt.compare(_plainTextPassword, _encryptPasswordHash)
    } catch (error) {
        return error;
    }
}

module.exports = { loginUser, createUser, getUser};
