const express = require('express')
const router = express.Router()
const roomService = require('../services/roomService')

router.post('/create', function (req, res) {
    const {name_room, description, capacity, image_room, active} = req.body
    roomService.createRoom(name_room, description, capacity, image_room, active).then(
        msg => {
            res.send(msg)
        }
    )
})

router.post('/find', function (req, res) {
    // noinspection JSAnnotator
    const { name_room } = req.body
    roomService.findRoomByName(name_room).then(msg => {
        res.send(msg)
    })
})

router.get('/findall', function (req, res) {
    roomService.findAll().then(msg => {
        res.send(msg)
    })
})

router.delete('/delete', function (req, res) {
    // noinspection JSAnnotator
    const { name_room } = req.body
    roomService.deleteRoom(name_room).then(msg => {
        res.send(msg)
    })
})

module.exports = router


