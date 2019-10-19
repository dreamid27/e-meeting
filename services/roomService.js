const mongoose = require('mongoose')
const roomModel = require('../model/roomModel')
mongoose.connect('mongodb://localhost/emeeting_db', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind('Connection error:'))
.then(obj => console.log('Connected'))
.catch(obj => console.log('not connected'))

const createRoom = async (_nameRoom, _description, _capacity, _imageRoom, _active) => {
    let objRoom = new roomModel({
        name_room: _nameRoom,
        description: _description,
        capacity: _capacity,
        image_room: _imageRoom,
        active: _active
    });
    let resRoom = await objRoom.save();
    if (resRoom)
        return `Room ${_nameRoom} berhasil dibuat`

    return `User ${_nameRoom} gagal dibuat`;
}

const findRoomByName = async (_nameRome) =>{
    let objRoom= await roomModel.findOne({
        name_room: _nameRome
    });
    return objRoom;
}

const findAll= async () => {
    let objRoom = await roomModel.find();
    return objRoom;
}

const deleteRoom = async (_nameRoom) => {
    let objRoom = await roomModel.deleteOne({
        name_room: _nameRoom
    });
    if (objRoom){
        return `Room ${_nameRoom} berhasil disimpan`
    }
    return `Gagal menghapus room ${name_room}`
}

module.exports = {createRoom, findRoomByName, findAll, deleteRoom}