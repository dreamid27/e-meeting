const mongoose = require('mongoose')
const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')
const JWTService = require('./JWTService')

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
.then(obj => console.log('We\'re Connection'))
.catch(obj => console.log('tetew'))

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
