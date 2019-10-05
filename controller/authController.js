const express = require('express')
const router = express.Router()
const authService = require('../services/authService')

// Home page route.
router.post('/login', function (req, res) {
  const { username, password } = req.body
  authService.loginUser(username, password).then(msg => {
    res.send(msg)
  })
})
  
// About page route.
router.post('/register', function (req, res) {
  const { username, password, email } = req.body
  authService.createUser(username, password, email).then(msg => {
    res.send(msg)
  })
})

module.exports = router