const express = require('express')
const router = express.Router()
const authService = require('../services/authService')

// Home page route.
router.post('/login', function (req, res) {
  const { username, password } = req.body
  authService.loginUser(username, password).then(obj => {
    if (obj) {
      res.send({'token': obj})
    } else {
      res.status(400);
      res.send('Username atau Password salah')
    }
  })
})
  
// About page route.
router.post('/register', function (req, res) {
  const { username, password, email } = req.body
  authService.createUser(username, password, email).then(obj => {
    if (obj) {
      res.send('Berhasil Login')
    } else {
      res.status(400);
      res.send('Username atau Password salah')
    }
  })
})

router.get('/user', function (req, res) {
  authService.getUser(req.headers.authorization).then(obj => {
    if (obj) {
      res.send({data: obj})
    } else {
      res.status(400);
      res.send('Not Authonticated')
    }
  })
})

module.exports = router