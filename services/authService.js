const mongoose = require('mongoose')
const userModel = require('../model/userModel')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
.then(obj => console.log('We\'re Connection'))
.catch(obj => console.log('tetew'))

const createUser = async (_username, _password, _email) => {
    let objUser = new userModel({username: _username, password: _password, email: _email});
    let resUser = await objUser.save()
    if (resUser)
        return `User ${_username} berhasil di buat`
    
    return `User ${_username} gagal di buat`; //User Create
}

const loginUser = async (_username, _password) => {
    let objUser =  await userModel.findOne({ username: _username, password: _password });
    if (objUser) {
        //Success
        return 'Berhasil Login'
    } 
    return 'Username atau Password salah'
}

module.exports = { loginUser, createUser};
