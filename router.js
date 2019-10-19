const router = require('express').Router()
const authController =  require('./controller/authController')
const roomController = require('./controller/roomController')

router.get('/', function(req, res) {
    res.send('im the home page!') 
});
router.use('/auth', authController)

router.use('/room', roomController)

// app.use('/auth', authRoutes)

module.exports = router;